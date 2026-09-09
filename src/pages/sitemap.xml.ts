import type { APIRoute } from 'astro';
import { projects, CATEGORY_ORDER } from '../lib/projects';
import { REGION_HUBS, REGION_ORDER, getRegionProjects } from '../lib/regions';
import { SITE_URL } from '../lib/site.config.js';

export const GET: APIRoute = () => {
  const baseUrl = SITE_URL.replace(/\/$/, '');
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    {
      loc: `${baseUrl}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '1.0',
      images: [
        {
          loc: `${baseUrl}/images/dps_amravati_aerial.png`,
          title: 'Delhi Public School Amravati Campus — K2 Architects',
          caption: 'Aerial photograph of Delhi Public School campus master planned by K2 Architects in Amravati, Maharashtra.',
        },
        {
          loc: `${baseUrl}/images/DPS%20KATNI%20aerial.jpg`,
          title: 'Delhi Public School Katni Master Plan — K2 Architects',
          caption: 'Campus master plan rendering of Delhi Public School in Katni, Madhya Pradesh.',
        },
        {
          loc: `${baseUrl}/images/AYURVEDIC_COLLEGE_RAIGARH.jpg`,
          title: 'Ayurvedic College and Hospital Raigarh — K2 Architects',
          caption: 'Institutional healthcare campus architecture in Raigarh, Chhattisgarh.',
        },
      ],
    },
    {
      loc: `${baseUrl}/works`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9',
      images: projects.slice(0, 30).map((p) => ({
        loc: `${baseUrl}/${encodeURI(p.image)}`,
        title: `${p.title}, ${p.city} — K2 Architects`,
        caption: `${p.sector} architecture in ${p.location} designed by K2 Architects Nagpur.`,
      })),
    },
    {
      loc: `${baseUrl}/studio`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8',
      images: [
        {
          loc: `${baseUrl}/images/DPS%20KATNI%20aerial.jpg`,
          title: 'K2 Architects Studio and Campus Master Planning',
          caption: 'Institutional master planning by Principal Architect Ar. Sachin Kothari and Landscape Architect Ar. Riya Kothari.',
        },
        {
          loc: `${baseUrl}/images/team1.jpg`,
          title: 'Ar. Sachin Kothari — Principal Architect',
          caption: 'Founder and Principal Architect at K2 Architects Nagpur.',
        },
        {
          loc: `${baseUrl}/images/team333pre2.png`,
          title: 'Ar. Riya Kothari — Landscape Architect',
          caption: 'Landscape Architect and Partner at K2 Architects Nagpur.',
        },
      ],
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8',
      images: [],
    },
    // Sector Landing Pages (Task 2)
    ...CATEGORY_ORDER.map((cat) => ({
      loc: `${baseUrl}/sectors/${cat}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.85',
      images: projects
        .filter((p) => p.category === cat)
        .slice(0, 5)
        .map((p) => ({
          loc: `${baseUrl}/${encodeURI(p.image)}`,
          title: `${p.title}, ${p.city} — K2 Architects`,
          caption: `${p.sector} architecture in ${p.location}`,
        })),
    })),
    // Regional & Pan-India Landing Pages (National Reach)
    ...REGION_ORDER.map((slug) => {
      const hub = REGION_HUBS[slug];
      const hubProjs = getRegionProjects(hub).slice(0, 5);
      return {
        loc: `${baseUrl}/regions/${slug}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.88',
        images: hubProjs.map((p) => ({
          loc: `${baseUrl}/${encodeURI(p.image)}`,
          title: `${p.title}, ${p.city} — ${hub.name}`,
          caption: `${p.sector} architecture in ${p.location} by K2 Architects.`,
        })),
      };
    }),
    // Individual Project Pages (Task 1)
    ...projects.map((p) => ({
      loc: `${baseUrl}/works/${p.slug}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8',
      images: p.images.map((img, i) => ({
        loc: `${baseUrl}/${encodeURI(img)}`,
        title: `${p.title} — photograph ${i + 1}`,
        caption: `${p.title} in ${p.location} by K2 Architects.`,
      })),
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${page.images
  .map(
    (img) => `    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
    </image:image>`
  )
  .join('\n')}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
