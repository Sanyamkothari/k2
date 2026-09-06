import { useCallback, useEffect, useRef, useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'motion/react';
import type { WorkItem } from './types';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Full-screen gallery for one project: keyboard, swipe, counter, caption,
 * Escape to close. URL state is handled by the parent.
 */
export function Gallery({ project, onClose }: { project: WorkItem; onClose: () => void }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const reduced = useReducedMotion();
  const n = project.gallery.length;
  const root = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const start = useRef<{ x: number; y: number; t: number } | null>(null);

  const go = useCallback((d: number) => { if (n < 2) return; setDir(d); setI((v) => (v + d + n) % n); }, [n]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.__lenis?.stop();
    closeBtn.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab') {
        // Keep focus inside the dialog.
        const f = root.current?.querySelectorAll<HTMLElement>('button, [href]');
        if (!f || !f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; window.__lenis?.start(); };
  }, [go, onClose]);

  // Preload neighbours.
  useEffect(() => {
    [i + 1, i - 1].forEach((k) => { const im = project.gallery[(k + n) % n]; if (im) { const el = new Image(); el.src = im.src; } });
  }, [i, n, project]);

  const onPointerDown = (e: React.PointerEvent) => { start.current = { x: e.clientX, y: e.clientY, t: Date.now() }; };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x, dy = e.clientY - start.current.y, dt = Date.now() - start.current.t;
    start.current = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 800) go(dx < 0 ? 1 : -1);
  };

  const img = project.gallery[i];

  return (
    <m.div
      ref={root}
      className="gallery"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title}, ${project.location}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="gallery__bar">
        <p className="gallery__counter tnum label">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</p>
        <button ref={closeBtn} type="button" className="gallery__close" onClick={onClose} aria-label="Close gallery">
          <span aria-hidden="true">Close</span> <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className="gallery__stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <m.img
            key={img.src}
            src={img.src}
            srcSet={img.srcset}
            sizes="100vw"
            width={img.width}
            height={img.height}
            alt={`${project.alt} — image ${i + 1} of ${n}`}
            className="gallery__img"
            draggable={false}
            custom={dir}
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: dir * 24, scale: 1.02 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, x: dir * -24, transition: { duration: 0.2 } }}
            transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
          />
        </AnimatePresence>
      </div>

      <div className="gallery__foot">
        <p className="gallery__caption">
          <span className="gallery__title">{project.title}</span>
          <span className="label muted">{project.sector} · {project.location}</span>
        </p>
        {n > 1 && (
          <div className="gallery__nav">
            <button type="button" onClick={() => go(-1)} aria-label="Previous image">←</button>
            <button type="button" onClick={() => go(1)} aria-label="Next image">→</button>
          </div>
        )}
      </div>
    </m.div>
  );
}
