// /src/pages/sitemap.xml.ts
import { fetchPosts } from '../utils/blog';

const SITE = 'https://intaxi.nl';

// Dynamische luchthaven-pagina’s
const dynamicAirports = [
  { slug: 'schiphol-airport' },
  { slug: 'rotterdam-the-hague' },
  { slug: 'eindhoven-airport' },
  { slug: 'antwerp-airport' },
  { slug: 'brussels-zaventem' },
  { slug: 'charleroi-airport' },
  { slug: 'duesseldorf-weeze' }
];

// Huidige build-datum voor lastmod (je kunt dit ook granular maken als je wilt)
const lastmod = new Date().toISOString().slice(0, 10);

export async function GET() {
  // EN en NL statische pagina’s
  const staticEN = [
    { path: '', priority: 1.0 },
    { path: '/en/contact', priority: 0.8 },
    { path: '/en/vliegveld-taxi', priority: 0.8 }
  ];
  const staticNL = [
    { path: '/contact', priority: 0.8 },
    { path: '/vliegveld-taxi', priority: 0.8 }
  ];

  // Dynamische URLs
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
  } catch { /* blog disabled: overslaan */ }

  // Alle URLs samenstellen
  const urls = [
    ...staticEN.map(({ path, priority }) => ({
      url: `${SITE}${path}`,
      priority,
      changefreq: 'monthly'
    })),
    ...staticNL.map(({ path, priority }) => ({
      url: `${SITE}${path}`,
      priority,
      changefreq: 'monthly'
    })),
    ...enAirportUrls,
    ...nlAirportUrls,
    ...blogUrls
  ];

  // Sitemap XML genereren
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, priority, changefreq }) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
