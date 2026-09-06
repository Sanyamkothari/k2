/**
 * Hover image reveal: a floating preview that follows the cursor across a list of rows.
 * Rows carry data-preview (src). The preview element is one <img> we swap.
 */
export function initHoverPreview(listSel: string, previewSel: string) {
  const list = document.querySelector<HTMLElement>(listSel);
  const preview = document.querySelector<HTMLElement>(previewSel);
  if (!list || !preview || list.dataset.previewBound) return;
  if (window.matchMedia('(hover: none)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  list.dataset.previewBound = '1';
  const img = preview.querySelector('img')!;
  let x = 0, y = 0, cx = 0, cy = 0, raf = 0, active = false;

  const loop = () => {
    cx += (x - cx) * 0.18;
    cy += (y - cy) * 0.18;
    preview.style.transform = `translate(${cx.toFixed(1)}px, ${cy.toFixed(1)}px) translate(-50%, -50%) scale(${active ? 1 : 0.96})`;
    raf = requestAnimationFrame(loop);
  };

  list.addEventListener('pointermove', (e) => { x = e.clientX + 60; y = e.clientY; });
  list.querySelectorAll<HTMLElement>('[data-preview]').forEach((row) => {
    row.addEventListener('pointerenter', (e) => {
      const src = row.dataset.preview!;
      if (img.getAttribute('src') !== src) img.setAttribute('src', src);
      x = (e as PointerEvent).clientX + 60; y = (e as PointerEvent).clientY;
      if (!active) { cx = x; cy = y; }
      active = true;
      preview.classList.add('is-on');
      cancelAnimationFrame(raf); raf = requestAnimationFrame(loop);
    });
  });
  list.addEventListener('pointerleave', () => { active = false; preview.classList.remove('is-on'); setTimeout(() => { if (!active) cancelAnimationFrame(raf); }, 300); });
}
