/**
 * Deployment settings. Plain JS so astro.config.mjs can import it too.
 * SITE_URL: the public origin, used for canonical URLs, Open Graph and JSON-LD.
 *           Override with the SITE_URL environment variable at build time.
 * FORMSPREE_ID: create a form at https://formspree.io and paste its id here
 *           (e.g. "xabcdefg"). Leave empty to fall back to a mailto: link.
 */
export const SITE_URL = process.env.SITE_URL || 'https://www.k2architects.in';
export const FORMSPREE_ID = process.env.FORMSPREE_ID || '';
