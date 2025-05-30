// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  css: ['@unocss/reset/tailwind.css'],

  app: {
    head: {
      title: '动画 Bingo',
      viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
      htmlAttrs: {
        lang: 'zh-CN'
      },
      link: [{ rel: 'icon', href: '/favicon.svg' }],
      meta: [],
      script: []
    }
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

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/scripts',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    'unplugin-info/nuxt',
    'unplugin-analytics/nuxt'
  ],

  unocss: {
    preflight: true
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
})