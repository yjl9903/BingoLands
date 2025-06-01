import { fileURLToPath } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  css: ['@unocss/reset/tailwind.css'],

  app: {
    head: {
      title: 'BingoLands 宾果群岛',
      viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
      htmlAttrs: {
        lang: 'zh-CN'
      },
      link: [{ rel: 'icon', href: '/favicon.svg' }],
      meta: [],
      script: []
    }
  },

  alias: {
    binglands: fileURLToPath(new URL('./packages/bingolands/src/index.ts', import.meta.url))
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
            database_id: 'ba92e095-943d-476f-a8ca-cb4e7ddbd94b'
          }
        ]
      }
    }
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  modules: [
    '@nuxt/content',
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
    'nuxt-rate-limit'
  ],

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
