import { useEffect, useRef } from 'react';
import type { WorkItem } from './types';

/** Floating preview that follows the cursor over the index table. Pointer devices only. */
export function HoverPreview({ item, pos }: { item: WorkItem | null; pos: React.MutableRefObject<{ x: number; y: number }> }) {
  const ref = useRef<HTMLDivElement>(null);
  const cur = useRef({ x: 0, y: 0, init: false });

  useEffect(() => {
    if (!item) { cur.current.init = false; return; }
    let raf = 0;
    const loop = () => {
      const el = ref.current; if (!el) return;
      const tx = pos.current.x + 48, ty = pos.current.y;
      if (!cur.current.init) { cur.current = { x: tx, y: ty, init: true }; }
      cur.current.x += (tx - cur.current.x) * 0.18;
      cur.current.y += (ty - cur.current.y) * 0.18;
      el.style.transform = `translate(${cur.current.x.toFixed(1)}px, ${cur.current.y.toFixed(1)}px) translate(0, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [item, pos]);

  return (
    <div ref={ref} className={`hover-preview figure ${item ? 'is-on' : ''}`} aria-hidden="true">
      {item && <img src={item.preview} alt="" width="360" height="270" />}
    </div>
  );
}
