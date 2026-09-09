/**
 * Hover image reveal: a floating preview that follows the cursor across a list of rows.
 * Features:
 * - Positions smoothly beside the pointer without covering the cursor or the text.
 * - Flips horizontally when close to the right edge of the viewport.
 * - Clamps vertically within the viewport bounds.
 * - Smooth CSS crossfades between images without visual popping.
 * - Respects prefers-reduced-motion and touch-only devices.
 */
export function initHoverPreview(listSel: string, previewSel: string) {
  const list = document.querySelector<HTMLElement>(listSel);
  const preview = document.querySelector<HTMLElement>(previewSel);
  if (!list || !preview || list.dataset.previewBound) return;
  if (window.matchMedia('(hover: none)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  list.dataset.previewBound = '1';

  const rows = list.querySelectorAll<HTMLElement>('[data-preview-id], [data-preview]');
  const images = preview.querySelectorAll<HTMLElement>('.hover-preview__img');

  let targetX = 0;
  let targetY = 0;
  let curX = 0;
  let curY = 0;
  let raf = 0;
  let active = false;
  let previewWidth = 0;
  let previewHeight = 0;

  const updateDimensions = () => {
    const rect = preview.getBoundingClientRect();
    previewWidth = rect.width || 352;
    previewHeight = rect.height || 264;
  };

  const calculateTarget = (clientX: number, clientY: number) => {
    if (!previewWidth || !previewHeight) updateDimensions();
    const gap = 32; // Clearance so the card never covers cursor or text
    const pad = 24; // Minimum margin from viewport edges

    // Horizontal: default to right of cursor; flip to left if near right edge
    if (clientX + gap + previewWidth <= window.innerWidth - pad) {
      targetX = clientX + gap;
    } else if (clientX - gap - previewWidth >= pad) {
      targetX = clientX - gap - previewWidth;
    } else {
      targetX = Math.max(pad, Math.min(window.innerWidth - previewWidth - pad, clientX + gap));
    }

    // Vertical: center vertically on cursor, clamped to viewport
    const centeredY = clientY - previewHeight / 2;
    targetY = Math.max(pad, Math.min(window.innerHeight - previewHeight - pad, centeredY));
  };

  const loop = () => {
    curX += (targetX - curX) * 0.16;
    curY += (targetY - curY) * 0.16;
    preview.style.transform = `translate3d(${curX.toFixed(1)}px, ${curY.toFixed(1)}px, 0)`;
    raf = requestAnimationFrame(loop);
  };

  const showImage = (idOrSrc: string | null) => {
    if (!idOrSrc) return;
    let matched: HTMLElement | null = null;
    if (idOrSrc.startsWith('#')) {
      matched = preview.querySelector<HTMLElement>(idOrSrc);
    } else {
      matched = preview.querySelector<HTMLElement>(`#${idOrSrc}`);
    }

    if (matched && images.length > 0) {
      images.forEach((img) => {
        img.classList.toggle('is-active', img === matched);
      });
    } else {
      const singleImg = preview.querySelector('img');
      if (singleImg && singleImg.getAttribute('src') !== idOrSrc) {
        singleImg.setAttribute('src', idOrSrc);
      }
    }
  };

  list.addEventListener('pointermove', (e) => {
    calculateTarget(e.clientX, e.clientY);
  });

  rows.forEach((row) => {
    row.addEventListener('pointerenter', (e) => {
      const pe = e as PointerEvent;
      updateDimensions();
      calculateTarget(pe.clientX, pe.clientY);

      if (!active) {
        curX = targetX;
        curY = targetY;
        preview.style.transform = `translate3d(${curX.toFixed(1)}px, ${curY.toFixed(1)}px, 0)`;
      }

      const idOrSrc = row.dataset.previewId || row.dataset.preview || null;
      showImage(idOrSrc);

      active = true;
      preview.classList.add('is-on');
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    });
  });

  list.addEventListener('pointerleave', () => {
    active = false;
    preview.classList.remove('is-on');
    setTimeout(() => {
      if (!active) cancelAnimationFrame(raf);
    }, 300);
  });

  window.addEventListener('resize', updateDimensions, { passive: true });
}
