import { fileURLToPath } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  css: ['@unocss/reset/tailwind.css'],

  site: {
    url: 'https://bingo.animes.garden',
    name: 'BingoLands 宾果群岛'
  },

  app: {
    head: {
      title: 'BingoLands 宾果群岛',
      viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
      htmlAttrs: {
        lang: 'zh-CN'
      },
      link: [
        { rel: 'icon', href: '/favicon.svg' },
        { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' }
      ],
      meta: [],
      script: []
    }
  },

  alias: {
    bingolands: fileURLToPath(new URL('./packages/bingolands/src/index.ts', import.meta.url)),
    '@bingolands/vue': fileURLToPath(new URL('./packages/vue/src/index.ts', import.meta.url))
  },

  nitro: {
    prerender: {
      autoSubfolderIndex: false
    },
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
      wrangler: {
        name: 'animebingo',
        d1_databases: [
          {
            binding: 'D1_DATABASE',
            database_id: '1215f25d-d9dd-4b49-b012-e81ff36a1ece'
          }
        ]
      }
    }
  },

  components: [
    {
      path: '~/components/ui',
      pathPrefix: false
    },
    {
      path: '~/components/bingo/table',
      pathPrefix: true
    },
    {
      path: '~/components/bingo/basic',
      pathPrefix: true
    }
  ],

  modules: [
    // '@nuxt/content',
    '@nuxt/scripts',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    'unplugin-info/nuxt',
    'unplugin-analytics/nuxt',
    'shadcn-nuxt',
    'nuxt-monaco-editor',
    '@pinia/nuxt',
    'nuxt-rate-limit',
    '@nuxtjs/sitemap'
  ],

  sitemap: {
    sources: ['/api/__sitemap__/bingos'],
    sitemaps: {
      pages: {
        includeAppSources: true
      },
      bingos: {
        include: ['/bingos/**']
      }
    }
  },

  nuxtRateLimit: {
    routes: {
      '/api/bingo': {
        maxRequests: 3,
        intervalSeconds: 60
      }
    }
  },

  monacoEditor: {
    locale: 'zh-hans',
    componentName: {
      codeEditor: 'MonacoEditor',
      diffEditor: 'MonacoDiffEditor'
    }
  },
  unocss: {
    preflight: true
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  info: {
    meta: {
      // ...
    }
  },
  analytics: {
    umami: {
      src: 'https://umami.animes.garden/script.js',
      id: 'a4a34be3-5598-4cf8-aa12-90ae03e72a21'
    }
  }
});
