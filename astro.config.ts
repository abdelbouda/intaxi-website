import { defineConfig } from 'astro/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Integraties
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import type { AstroIntegration } from 'astro';

// Vercel Adapter
import vercel from '@astrojs/vercel';

// Lokale project imports
import astrowind from './vendor/integration';
import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';

// Fix voor __dirname in ESM mode
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({
  // Essentieel voor SEO en sitemaps
  site: 'https://www.intaxi.nl',

  // Internationalization (i18n)
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl', 'en'],
    routing: {
      prefixDefaultLocale: false, // nl op /, en op /en/
    },
  },

  // 'server' output is nodig voor je dynamische taxi-pagina's op Vercel
  output: 'server',

  // Vercel configuratie
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    // Meertalige sitemap
    sitemap({
      i18n: {
        defaultLocale: 'nl',
        locales: {
          nl: 'nl-NL',
          en: 'en-US',
        },
      },
    }),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),

    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),
    
    astrowind({
      config: './src/config.yaml',
    }),
  ],

  image: {
    domains: ['cdn.pixabay.com', 'images.unsplash.com'],
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        quality: 80,
        progressive: true,
      },
    },
  },

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
