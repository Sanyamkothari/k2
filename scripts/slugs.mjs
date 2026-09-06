/** Prints every project slug so `featured` in src/lib/site.ts can reference them. */
import raw from '../data/projects.json' with { type: 'json' };
const titleCase = (s) => s.toLowerCase().replace(/(^|[\s(\-.])([a-z])/g, (m, p, c) => p + c.toUpperCase());
const slugify = (s) => s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const seen = new Map();
for (const [cat, list] of Object.entries(raw)) {
  for (const p of list) {
    const city = (p.description.match(/^(.*?)\s*\(/) || [, p.description])[1];
    let slug = slugify(`${titleCase(p.title)} ${titleCase(city)}`);
    const n = seen.get(slug) ?? 0; seen.set(slug, n + 1); if (n) slug += `-${n + 1}`;
    console.log(`${cat.padEnd(12)} ${slug}`);
  }
}
