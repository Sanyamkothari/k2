/** Prints every project slug so `featured` in src/lib/site.ts can reference them. */
import raw from '../data/projects.json' with { type: 'json' };

const SMALL_WORDS = new Set(['of', 'for', 'and', 'the', 'at', 'in']);
const KEEP_UPPER = new Set([
  'DPS', 'CITM', 'MSM', 'RMCH', 'JITO', 'GD', 'P.P.', 'R.K.', 'G.D.', 'V.B', 'V.B.', 'ENG.', 'MR.',
  'DB', 'BBA', 'MBA', 'MCA', 'HUDCO', 'NABH', 'CBSE', 'ICSE'
]);

function titleCase(input) {
  return input
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/ENG\.COLLEGE/gi, 'Engineering College')
    .replace(/MULTY-HOSPITAL/gi, 'Multi-Hospital')
    .replace(/BUNGLOW/gi, 'Bungalow')
    .replace(/BANGLOWS/gi, 'Bungalows')
    .replace(/MULTISPECIALITY/gi, 'Multi-speciality')
    .replace(/MULTI-SPECIALITY/gi, 'Multi-speciality')
    .replace(/ORTHOPEDIC/gi, 'Orthopaedic')
    .split(' ')
    .map((word, i) => {
      const bare = word.replace(/[(),]/g, '');
      if (KEEP_UPPER.has(bare)) return word;
      const lower = word.toLowerCase();
      if (i > 0 && SMALL_WORDS.has(lower)) return lower;
      return lower.replace(/(^|[(\-.])([a-z])/g, (_m, p, c) => p + c.toUpperCase());
    })
    .join(' ')
    .replace(/Mr\.([A-Z])/g, 'Mr. $1')
    .replace(/\bMulti-Speciality\b/g, 'Multi-speciality')
    .replace(/\bthe School\b/g, 'The School')
    .replace(/\bthe Concept School\b/g, 'The Concept School');
}

const slugify = (s) => s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const CATEGORY_ORDER = ['engineering', 'college', 'medi', 'hostel', 'residential', 'bungalow', 'banquets', 'industrial'];

const seen = new Map();
for (const cat of CATEGORY_ORDER) {
  for (const p of raw[cat] ?? []) {
    const city = (p.description.match(/^(.*?)\s*\(/) || [, p.description])[1];
    let slug = slugify(`${titleCase(p.title)} ${titleCase(city)}`);
    const n = seen.get(slug) ?? 0; seen.set(slug, n + 1); if (n) slug += `-${n + 1}`;
    console.log(`${cat.padEnd(12)} ${slug}`);
  }
}
