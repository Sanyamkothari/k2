/**
 * Reads data/projects.json (the single source of truth) and normalises it
 * for rendering: clean sector labels, title case, parsed city/state, stable slugs.
 */
import raw from '../../data/projects.json';

export type Category = 'engineering' | 'residential' | 'hostel' | 'bungalow' | 'banquets' | 'medi' | 'college';

export interface RawProject {
  id: number;
  title: string;
  description: string;
  image: string;
  images?: string[];
  year?: number | string;
}

export interface Project {
  slug: string;
  category: Category;
  sector: string;
  title: string;
  city: string;
  state: string;
  location: string;
  image: string;
  images: string[];
  year?: string;
  alt: string;
}

/** Category keys in the JSON -> labels shown in the UI. Order is the filter order. */
export const SECTORS: Record<Category, string> = {
  engineering: 'Schools',
  college: 'Colleges & Campuses',
  medi: 'Hospitals & Healthcare',
  hostel: 'Hostels & Public Buildings',
  residential: 'Residential & Commercial',
  bungalow: 'Bungalows & Townships',
  banquets: 'Banquets & Hospitality',
};
export const CATEGORY_ORDER = Object.keys(SECTORS) as Category[];

const STATE_NAMES: Record<string, string> = {
  'M.S.': 'Maharashtra',
  'C.G.': 'Chhattisgarh',
  'M.P.': 'Madhya Pradesh',
  'U.P.': 'Uttar Pradesh',
  'A.P.': 'Andhra Pradesh',
  ODISHA: 'Odisha',
};

const SMALL_WORDS = new Set(['of', 'for', 'and', 'the', 'at', 'in']);
const KEEP_UPPER = new Set(['DPS', 'CITM', 'MSM', 'RMCH', 'JITO', 'GD', 'P.P.', 'R.K.', 'G.D.', 'V.B', 'V.B.', 'ENG.', 'MR.']);

/** ALL CAPS in the data -> Title Case at render time. Keeps initialisms. */
export function titleCase(input: string): string {
  return input
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/ENG\.COLLEGE/gi, 'Engineering College')
    .replace(/MULTY-HOSPITAL/gi, 'Multi-Hospital')
    .replace(/BUNGLOW/gi, 'Bungalow')
    .replace(/BANGLOWS/gi, 'Bungalows')
    .replace(/MULTISPECIALITY/gi, 'Multispeciality')
    .split(' ')
    .map((word, i) => {
      const bare = word.replace(/[()]/g, '');
      if (KEEP_UPPER.has(bare)) return word;
      const lower = word.toLowerCase();
      if (i > 0 && SMALL_WORDS.has(lower)) return lower;
      return lower.replace(/(^|[(\-.])([a-z])/g, (_m, p, c) => p + c.toUpperCase());
    })
    .join(' ')
    .replace(/Mr\.([A-Z])/g, 'Mr. $1');
}

function parseLocation(desc: string): { city: string; state: string } {
  const m = desc.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (!m) return { city: titleCase(desc), state: '' };
  const city = titleCase(m[1]).replace(/Chh\. Sambhaji Nagar/i, 'Chh. Sambhaji Nagar');
  const state = STATE_NAMES[m[2].trim().toUpperCase()] ?? titleCase(m[2]);
  return { city, state };
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function build(): Project[] {
  const data = raw as Record<Category, RawProject[]>;
  const seen = new Map<string, number>();
  const out: Project[] = [];
  for (const category of CATEGORY_ORDER) {
    for (const p of data[category] ?? []) {
      const title = titleCase(p.title);
      const { city, state } = parseLocation(p.description);
      let slug = slugify(`${title} ${city}`);
      const n = seen.get(slug) ?? 0;
      seen.set(slug, n + 1);
      if (n > 0) slug = `${slug}-${n + 1}`;
      const images = Array.from(new Set([p.image, ...(p.images ?? [])]));
      out.push({
        slug,
        category,
        sector: SECTORS[category],
        title,
        city,
        state,
        location: state ? `${city}, ${state}` : city,
        image: p.image,
        images,
        year: p.year ? String(p.year) : undefined,
        alt: `${title}, ${city}${state ? ', ' + state : ''} — ${SECTORS[category]} by K2 Architects`,
      });
    }
  }
  return out;
}

export const projects: Project[] = build();
export const projectCount = projects.length;
export const sectorCount = CATEGORY_ORDER.length;
export const bySlug = new Map(projects.map((p) => [p.slug, p]));
export const hasYears = projects.some((p) => p.year);
