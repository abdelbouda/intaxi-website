// /src/pages/sitemap.xml.ts
import { fetchPosts } from '../utils/blog';

const SITE = 'https://intaxi.nl';

// Zorg dat deze slugs exact matchen met de slugs in je [luchthaven].astro bestanden!
const dynamicAirports = [
  { slug: 'schiphol' },
  { slug: 'rotterdam' },
  { slug: 'eindhoven' },
  { slug: 'antwerpen' },
  { slug: 'brussel' },
  { slug: 'charleroi' },
  { slug: 'duesseldorf' }
];

const lastmod = new Date().toISOString().slice(0, 10);

export async function GET() {
  // Statische pagina's (NL en EN)
  const staticEN = [
    { path: '/en', priority: 1.0 },
    { path: '/en/contact', priority: 0.8 },
    { path: '/en/vliegveld-taxi', priority: 0.8 }
  ];
  const staticNL = [
    { path: '/', priority: 1.0 },
    { path: '/contact', priority: 0.8 },
    { path: '/vliegveld-taxi', priority: 0.8 }
  ];

  // Dynamische Airport URLs (EN: /en/taxi-slug, NL: /taxi-slug)
  const enAirportUrls = dynamicAirports.map(({ slug }) => ({
    url: `${SITE}/en/taxi-${slug}`,
    priority: 0.7,
    changefreq: 'monthly'
  }));
  const nlAirportUrls = dynamicAirports.map(({ slug }) => ({
    url: `${SITE}/taxi-${slug}`,
    priority: 0.7,
    changefreq: 'monthly'
  }));

  // Blogs ophalen
  let blogUrls: Array<{ url: string; priority: number; changefreq: string }> = [];
  try {
    const posts = await fetchPosts?.();
    if (posts && posts.length) {
      blogUrls = posts.map(post => ({
        url: `${SITE}/blog/${post.slug}`,
        priority: 0.6,
        changefreq: 'monthly'
      }));
    }
  } catch { /* blog overgeslagen */ }

  // Alle URLs combineren
  const allUrls = [
    ...staticEN,
    ...staticNL,
    ...enAirportUrls,
    ...nlAirportUrls,
    ...blogUrls
  ];

  // Sitemap XML genereren
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((item) => {
    // Check of item.url al een volledige URL is (bij blogs/airports) of nog een pad (bij static)
    const fullUrl = 'url' in item ? item.url : `${SITE}${item.path}`;
    return `
  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${'changefreq' in item ? item.changefreq : 'monthly'}</changefreq>
    <priority>${item.priority}</priority>
  </url>`;
  }).join('')}
</urlset>`.trim();

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
