import type { APIRoute } from 'astro';

/** robots.txt with the sitemap location derived from SITE_URL. */
export const GET: APIRoute = ({ site }) => {
  const body = ['User-agent: *', 'Allow: /', 'Disallow: /styleguide', '', `Sitemap: ${new URL('sitemap-index.xml', site)}`, ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
