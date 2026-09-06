/**
 * Site-wide behaviour. Everything registers on astro:page-load so it survives
 * client-side navigation, and everything is skipped or simplified when the
 * visitor prefers reduced motion.
 */
import Lenis from 'lenis';
import { animate, inView, stagger } from 'motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;

/* ---------- Smooth scroll ---------- */
function startLenis() {
  if (lenis || reduced()) return;
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
  const loop = (t: number) => { lenis?.raf(t); requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
  // Anchor links go through Lenis so the offset is right under the fixed nav.
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!a) return;
    const target = document.querySelector(a.getAttribute('href') || '');
    if (target) { e.preventDefault(); lenis?.scrollTo(target as HTMLElement, { offset: -72 }); }
  });
}

/* ---------- Nav: paper bar once past the hero, hide on scroll down ---------- */
function initNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  const transparent = nav.dataset.transparent === 'true';
  let last = window.scrollY;
  const update = () => {
    const y = window.scrollY;
    const threshold = transparent ? Math.min(window.innerHeight * 0.6, 480) : 24;
    nav.classList.toggle('is-solid', y > threshold);
    const menuOpen = document.body.classList.contains('menu-open');
    nav.classList.toggle('is-hidden', !menuOpen && y > last + 4 && y > 240);
    if (y < last - 4 || y < 240) nav.classList.remove('is-hidden');
    last = y;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });

  const toggle = document.getElementById('nav-toggle') as HTMLButtonElement | null;
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;
  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    lenis?.start();
    setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 400);
  };
  const open = () => {
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.add('is-open'));
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('menu-open');
    nav.classList.remove('is-hidden');
    lenis?.stop();
    (menu.querySelector('a') as HTMLElement | null)?.focus({ preventScroll: true });
  };
  toggle.addEventListener('click', () => (toggle.getAttribute('aria-expanded') === 'true' ? close() : open()));
  menu.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { close(); toggle.focus(); } });
}

/* ---------- Reveals ---------- */
function splitLines(el: HTMLElement): HTMLElement[] {
  // Wrap words, measure their line, then wrap each line in a mask.
  const text = el.textContent || '';
  const words = text.split(/\s+/).filter(Boolean);
  el.textContent = '';
  const spans = words.map((w) => { const s = document.createElement('span'); s.textContent = w + ' '; s.style.display = 'inline-block'; el.appendChild(s); return s; });
  const lines: HTMLElement[][] = [];
  let top: number | null = null;
  for (const s of spans) {
    const t = s.offsetTop;
    if (top === null || Math.abs(t - top) > 2) { lines.push([]); top = t; }
    lines[lines.length - 1].push(s);
  }
  el.textContent = '';
  return lines.map((ws) => {
    const mask = document.createElement('span'); mask.className = 'split-line';
    const inner = document.createElement('span');
    inner.textContent = ws.map((w) => w.textContent!.trim()).join(' ');
    mask.appendChild(inner); el.appendChild(mask);
    return inner;
  });
}

function initReveals() {
  const isReduced = reduced();

  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    if (el.dataset.splitDone) return;
    el.dataset.splitDone = '1';
    if (isReduced) return;
    const original = el.innerHTML;
    const lines = splitLines(el);
    lines.forEach((l) => { l.style.transform = 'translateY(110%)'; });
    el.style.opacity = '1';
    const delay = Number(el.dataset.delay || 0);
    inView(el, () => {
      animate(lines, { transform: ['translateY(110%)', 'translateY(0%)'] }, { duration: 0.9, ease: EASE, delay: stagger(0.08, { startDelay: delay }) }).then(() => { el.innerHTML = original; });
    }, { amount: 0.4 });
  });

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (isReduced) { el.style.opacity = '1'; el.style.transform = 'none'; return; }
    const delay = Number(el.dataset.delay || 0);
    inView(el, () => {
      animate(el, { opacity: [0, 1], transform: [el.dataset.reveal === 'up' ? 'translateY(1.25rem)' : 'none', 'none'] }, { duration: 0.8, ease: EASE, delay });
    }, { amount: 0.25 });
  });

  document.querySelectorAll<HTMLElement>('[data-reveal-img]').forEach((el) => {
    if (isReduced) { el.classList.add('is-revealed'); return; }
    inView(el, () => { el.classList.add('is-revealed'); }, { amount: 0.2 });
  });

  // Group reveal: children stagger in.
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const kids = Array.from(group.children) as HTMLElement[];
    if (isReduced) return;
    kids.forEach((k) => { k.style.opacity = '0'; k.style.transform = 'translateY(1rem)'; });
    inView(group, () => {
      animate(kids, { opacity: [0, 1], transform: ['translateY(1rem)', 'none'] }, { duration: 0.8, ease: EASE, delay: stagger(0.08) });
    }, { amount: 0.2 });
  });
}

/* ---------- Subtle parallax on tagged figures (max ~12% travel) ---------- */
function initParallax() {
  if (reduced()) return;
  const els = document.querySelectorAll<HTMLElement>('[data-parallax]');
  if (!els.length) return;
  const tick = () => {
    const vh = window.innerHeight;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1..1
      const travel = Number(el.dataset.parallax || 10);
      const img = el.querySelector('img');
      if (img) img.style.translate = `0 ${(-p * travel).toFixed(2)}%`;
    });
  };
  tick();
  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', tick);
}

/* ---------- Page transition curtain ---------- */
function initCurtain() {
  const curtain = document.getElementById('curtain');
  if (!curtain) return;
  document.addEventListener('astro:before-preparation', () => curtain.classList.add('is-on'));
  document.addEventListener('astro:after-swap', () => {
    window.scrollTo(0, 0);
    const c = document.getElementById('curtain');
    c?.classList.add('is-on');
    requestAnimationFrame(() => setTimeout(() => c?.classList.remove('is-on'), 120));
  });
}

function boot() {
  window.__lenis = lenis;
  initNav();
  initReveals();
  initParallax();
}

startLenis();
initCurtain();
document.addEventListener('astro:page-load', boot);
document.addEventListener('astro:before-swap', () => { document.body.classList.remove('menu-open'); lenis?.start(); });
