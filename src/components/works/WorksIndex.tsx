import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { LazyMotion, domMax, m, AnimatePresence, useReducedMotion } from 'motion/react';
import type { SectorOption, WorkItem, ArchiveItem } from './types';
import { Gallery } from './Gallery';
import { HoverPreview } from './HoverPreview';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
type View = 'grid' | 'index';

interface Props {
  items: WorkItem[];
  archive?: ArchiveItem[];
  sectors: SectorOption[];
  hasYears: boolean;
  totalCount?: number;
}

function readUrl() {
  const p = new URLSearchParams(window.location.search);
  return { sector: p.get('sector') || 'all', project: p.get('project') || null, view: (p.get('view') as View | null) || null };
}

function writeUrl(next: { sector: string; project: string | null; view: View }, replace = true) {
  const p = new URLSearchParams();
  if (next.sector !== 'all') p.set('sector', next.sector);
  if (next.view !== 'grid') p.set('view', next.view);
  if (next.project) p.set('project', next.project);
  const qs = p.toString();
  const url = `${window.location.pathname}${qs ? '?' + qs : ''}`;
  const state = { ...next };
  if (replace) history.replaceState(state, '', url); else history.pushState(state, '', url);
}

/** Frame pattern for the grid: fixed ratios that repeat so mixed sources read as one set. */
const PATTERN: Array<'photo' | 'portrait' | 'wide'> = ['photo', 'photo', 'photo', 'wide', 'portrait', 'portrait', 'wide', 'photo', 'photo', 'photo', 'portrait', 'wide'];

export default function WorksIndex({ items, archive = [], sectors, hasYears, totalCount }: Props) {
  const [sector, setSector] = useState('all');
  const [view, setView] = useState<View>('grid');
  const [open, setOpen] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const reduced = useReducedMotion();
  const lastTrigger = useRef<HTMLElement | null>(null);

  // URL is the source of truth for sector, view and open project.
  useEffect(() => {
    const u = readUrl();
    setSector(sectors.some((s) => s.key === u.sector) ? u.sector : 'all');
    let stored: string | null = null;
    try { stored = localStorage.getItem('k2:view'); } catch {}
    setView(u.view === 'index' || (!u.view && stored === 'index') ? 'index' : 'grid');
    setOpen(u.project && items.some((i) => i.slug === u.project) ? u.project : null);
    setHydrated(true);
    const onPop = () => { const n = readUrl(); setSector(n.sector); setView(n.view === 'index' ? 'index' : 'grid'); setOpen(n.project); };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [items, sectors]);

  const visible = useMemo(() => (sector === 'all' ? items : items.filter((i) => i.category === sector)), [items, sector]);
  const visibleArchive = useMemo(
    () => (sector === 'all' ? archive : archive.filter((i) => i.category === sector)),
    [archive, sector]
  );
  const current = open ? items.find((i) => i.slug === open) ?? null : null;

  const changeSector = (key: string) => { setSector(key); writeUrl({ sector: key, project: null, view }); };
  const changeView = (v: View) => { setView(v); try { localStorage.setItem('k2:view', v); } catch {} writeUrl({ sector, project: null, view: v }); };
  const openProject = useCallback((slug: string, trigger?: HTMLElement) => {
    lastTrigger.current = trigger ?? (document.activeElement as HTMLElement);
    setOpen(slug);
    writeUrl({ sector, project: slug, view }, false);
  }, [sector, view]);
  const closeProject = useCallback(() => {
    setOpen(null);
    writeUrl({ sector, project: null, view });
    requestAnimationFrame(() => lastTrigger.current?.focus?.({ preventScroll: true }));
  }, [sector, view]);

  const total = visible.length + visibleArchive.length;
  const currentSector = sectors.find((s) => s.key === sector);
  const label = sector === 'all' ? 'All sectors' : (currentSector?.label ?? sector);
  const allCount = totalCount ?? (items.length + archive.length);

  return (
    <LazyMotion features={domMax} strict>
      <div className="works-controls">
        <nav className="filters" aria-label="Filter by sector">
          <ul className="filters__list">
            <li><FilterButton active={sector === 'all'} onClick={() => changeSector('all')} count={allCount}>All</FilterButton></li>
            {sectors.map((s) => (
              <li key={s.key}><FilterButton active={sector === s.key} onClick={() => changeSector(s.key)} count={s.count}>{s.label}</FilterButton></li>
            ))}
          </ul>
        </nav>
        <div className="view-toggle" role="group" aria-label="View">
          <button type="button" className={`toggle ${view === 'grid' ? 'is-active' : ''}`} aria-pressed={view === 'grid'} onClick={() => changeView('grid')}>Grid</button>
          <span className="toggle-sep" aria-hidden="true">/</span>
          <button type="button" className={`toggle ${view === 'index' ? 'is-active' : ''}`} aria-pressed={view === 'index'} onClick={() => changeView('index')}>Index</button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">{hydrated ? `${total} projects, ${label}` : ''}</p>

      {view === 'grid' ? (
        visible.length > 0 ? (
          <m.ul className="wgrid" layout={!reduced} transition={{ duration: 0.6, ease: EASE }}>
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((p, i) => {
                const ratio = PATTERN[i % PATTERN.length];
                return (
                  <m.li
                    key={p.slug}
                    layout={!reduced}
                    initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.25 } }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className={`wcell wcell--${ratio}`}
                  >
                    <a href={`/works?project=${p.slug}`} className="wcard" onClick={(e) => { e.preventDefault(); openProject(p.slug, e.currentTarget); }}>
                      <div className={`figure ratio-${ratio}`}>
                        <img src={p.cover.src} srcSet={p.cover.srcset} sizes={ratio === 'wide' ? '(min-width: 64rem) 58vw, 92vw' : '(min-width: 64rem) 28vw, (min-width: 40rem) 45vw, 92vw'} width={p.cover.width} height={p.cover.height} alt={p.alt} loading={i < 4 ? 'eager' : 'lazy'} decoding="async" />
                      </div>
                      <div className="wcard__meta">
                        <span className="wcard__title">{p.title}</span>
                        <span className="label muted">{p.sector} · {p.city}</span>
                      </div>
                    </a>
                  </m.li>
                );
              })}
            </AnimatePresence>
          </m.ul>
        ) : (
          <div className="works-empty-photo">
            <p className="muted">All documented commissions in this sector are listed in the practice register below.</p>
          </div>
        )
      ) : (
        visible.length > 0 ? (
          <IndexTable items={visible} hasYears={hasYears} onOpen={openProject} />
        ) : (
          <div className="works-empty-photo">
            <p className="muted">All documented commissions in this sector are listed in the practice register below.</p>
          </div>
        )
      )}

      {archive.length > 0 && (
        <section className="works-register" aria-label="Practice Project Archive">
          <header className="works-register__head">
            <div>
              <p className="label muted">
                {sector === 'all'
                  ? 'Complete Practice Register · Institutional & Civic Archive'
                  : 'Practice Register · Institutional & Civic Archive'}
              </p>
              <h2 className="display-xl">
                Additional Commissions & Works{sector !== 'all' ? ` — ${label}` : ''}
              </h2>
            </div>
            <p className="works-register__count muted label">
              <span className="tnum">{visibleArchive.length}</span>{' '}
              archived commission{visibleArchive.length === 1 ? '' : 's'}{' '}
              {sector === 'all' ? 'across India' : `in ${label}`}
            </p>
          </header>

          {visibleArchive.length > 0 ? (
            <div className="works-register__grid">
              {visibleArchive.map((p) => (
                <article key={`${p.category}-${p.title}-${p.location}`} className="works-register__item">
                  <span className="works-register__sector label muted">{p.sector}</span>
                  <h3 className="works-register__title">{p.title}</h3>
                  <span className="works-register__loc muted">{p.location}</span>
                </article>
              ))}
            </div>
          ) : (
            <p className="works-register__empty muted">
              All documented commissions in {label} are featured in the photography gallery above.
            </p>
          )}
        </section>
      )}

      <AnimatePresence>
        {current && <Gallery key={current.slug} project={current} onClose={closeProject} />}
      </AnimatePresence>
    </LazyMotion>
  );
}

function FilterButton({ active, onClick, count, children }: { active: boolean; onClick: () => void; count: number; children: React.ReactNode }) {
  return (
    <button type="button" className={`filter ${active ? 'is-active' : ''}`} aria-pressed={active} onClick={onClick}>
      <span>{children}</span>
      <sup className="filter__count tnum">{count}</sup>
    </button>
  );
}

function IndexTable({ items, hasYears, onOpen }: { items: WorkItem[]; hasYears: boolean; onOpen: (slug: string, el?: HTMLElement) => void }) {
  const [hover, setHover] = useState<WorkItem | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  return (
    <div className="windex-wrap">
      <table className="windex" onPointerMove={(e) => { pos.current = { x: e.clientX, y: e.clientY }; }} onPointerLeave={() => setHover(null)}>
        <thead>
          <tr>
            <th scope="col" className="label muted">Title</th>
            <th scope="col" className="label muted">Sector</th>
            <th scope="col" className="label muted">City</th>
            {hasYears && <th scope="col" className="label muted">Year</th>}
            <th scope="col" className="label muted windex__n"><span className="sr-only">Images</span></th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence initial={false}>
            {items.map((p) => (
              <m.tr key={p.slug} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.5, ease: EASE }}
                onPointerEnter={() => setHover(p)} onFocus={() => setHover(null)}>
                <td>
                  <a href={`/works?project=${p.slug}`} className="windex__title" onClick={(e) => { e.preventDefault(); onOpen(p.slug, e.currentTarget); }}>
                    {p.title}
                  </a>
                </td>
                <td className="muted">{p.sector}</td>
                <td className="muted">{p.location}</td>
                {hasYears && <td className="muted tnum">{p.year ?? '—'}</td>}
                <td className="tnum muted windex__n">{p.gallery.length > 1 ? `${p.gallery.length} images` : ''}</td>
              </m.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
      <HoverPreview item={hover} pos={pos} />
    </div>
  );
}
