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
  rawCity: string;
  city: string;
  state: string;
  stateCode: string;
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

export const STATE_NAMES: Record<string, string> = {
  'M.S.': 'Maharashtra',
  'C.G.': 'Chhattisgarh',
  'M.P.': 'Madhya Pradesh',
  'U.P.': 'Uttar Pradesh',
  'A.P.': 'Andhra Pradesh',
  ODISHA: 'Odisha',
};

export const STATE_CODES: Record<string, string> = {
  'M.S.': 'M.S.',
  'MS': 'M.S.',
  'C.G.': 'C.G.',
  'CG': 'C.G.',
  'M.P.': 'M.P.',
  'MP': 'M.P.',
  'U.P.': 'U.P.',
  'UP': 'U.P.',
  'A.P.': 'A.P.',
  'AP': 'A.P.',
  'ODISHA': 'Odisha',
  'OD': 'Odisha',
  Maharashtra: 'M.S.',
  Chhattisgarh: 'C.G.',
  'Madhya Pradesh': 'M.P.',
  'Uttar Pradesh': 'U.P.',
  'Andhra Pradesh': 'A.P.',
  Odisha: 'Odisha',
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

function parseLocation(desc: string): { rawCity: string; city: string; state: string; stateCode: string } {
  const m = desc.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (!m) {
    const rawCity = titleCase(desc);
    return { rawCity, city: rawCity, state: '', stateCode: '' };
  }
  const rawCity = titleCase(m[1]).replace(/Chh\. Sambhaji Nagar/i, 'Chh. Sambhaji Nagar');
  const codeRaw = m[2].trim().toUpperCase();
  const state = STATE_NAMES[codeRaw] ?? titleCase(m[2]);
  const stateCode = STATE_CODES[codeRaw] ?? STATE_CODES[state] ?? m[2].trim();
  const city = stateCode ? `${rawCity} (${stateCode})` : rawCity;
  return { rawCity, city, state, stateCode };
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
      const { rawCity, city, state, stateCode } = parseLocation(p.description);
      let slug = slugify(`${title} ${rawCity}`);
      const n = seen.get(slug) ?? 0;
      seen.set(slug, n + 1);
      if (n > 0) slug = `${slug}-${n + 1}`;
      const images = Array.from(new Set([p.image, ...(p.images ?? [])]));
      out.push({
        slug,
        category,
        sector: SECTORS[category],
        title,
        rawCity,
        city,
        state,
        stateCode,
        location: city,
        image: p.image,
        images,
        year: p.year ? String(p.year) : undefined,
        alt: `${title}, ${city} — ${SECTORS[category]} by K2 Architects`,
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

export const SECTOR_DATA: Record<Category, { title: string; headline: string; description: string; longDesc: string }> = {
  engineering: {
    title: 'School & Educational Campus Architecture',
    headline: 'Campuses designed for learning, community, and generational longevity.',
    description: 'Master planning and architectural design for CBSE, ICSE, and international school campuses across India by K2 Architects.',
    longDesc: 'For over 25 years, K2 Architects has planned and delivered landmark educational campuses for premier national networks including Delhi Public School (DPS), Sanskar International, and Jindal World School. From academic clusters and high-efficiency circulation spines to integrated athletic fields and biophilic outdoor courtyards, each campus is designed for safety, operational economy, and inspiring pedagogy.',
  },
  college: {
    title: 'Colleges, Universities & Technical Campuses',
    headline: 'High-capacity academic environments engineered for higher education.',
    description: 'Engineering colleges, polytechnic institutes, and university master planning across Central India.',
    longDesc: 'Our studio combines large-scale spatial organization with climatic responsiveness to design university campuses, engineering faculties, and polytechnic institutes. We integrate lecture halls, research laboratories, administrative headquarters, and student housing into cohesive, walkable campus master plans.',
  },
  medi: {
    title: 'Hospital & Healthcare Architecture',
    headline: 'NABH-compliant multi-specialty healthcare and medical complexes.',
    description: 'Multi-specialty hospitals, trauma centers, and medical colleges engineered for sterile flow and patient care.',
    longDesc: 'Healthcare architecture demands structural precision and rigorous clinical zoning. K2 Architects designs NABH-compliant multi-specialty hospitals, diagnostic centers, and medical colleges that prioritize sterile and non-sterile circulation, rapid emergency ingress, patient dignity, and therapeutic natural daylighting.',
  },
  hostel: {
    title: 'Hostels & Public Buildings',
    headline: 'High-density institutional residential living and civic structures.',
    description: 'Student hostel complexes, civic community centers, and institutional residential infrastructure.',
    longDesc: 'Designing high-density residential facilities for universities and institutes requires balancing security, operational management, natural ventilation, and vibrant communal interaction. Our hostel master plans create dignified, enduring student living environments.',
  },
  residential: {
    title: 'Residential Towers & Commercial Plazas',
    headline: 'High-density urban living and vibrant commercial hubs.',
    description: 'Multi-storied residential apartments, commercial plazas, and mixed-use commercial developments.',
    longDesc: 'From high-density apartment complexes to regional retail hubs and commercial towers, K2 Architects balances vehicular accessibility, pedestrian engagement, structural economy, and distinctive street presence across Central India.',
  },
  bungalow: {
    title: 'Bungalows, Townships & Private Estates',
    headline: 'Bespoke residences, country farmhouses, and master-planned townships.',
    description: 'Luxury private villas, farmhouses, and integrated residential townships in Maharashtra and Central India.',
    longDesc: 'Our residential practice ranges from multi-acre integrated townships to bespoke private family estates. We celebrate indoor-outdoor connectivity, natural materials, private courtyards, and deep shade tailored to the hot-composite climate of Central India.',
  },
  banquets: {
    title: 'Banquets, Hospitality & Gathering Venues',
    headline: 'Civic celebration venues and grand hospitality infrastructure.',
    description: 'Banquets, celebratory marriage complexes, and hospitality architecture designed for major gatherings.',
    longDesc: 'Grand celebratory venues require seamless logistics, high-capacity banquet halls, commercial kitchens, ample parking circulation, and dramatic architectural presence. Our venues are engineered to host thousands with effortless operational flow.',
  },
};
