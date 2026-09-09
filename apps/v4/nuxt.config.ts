import tailwindcss from '@tailwindcss/vite'

const cloudflareD1DatabaseId = process.env.CLOUDFLARE_D1_DATABASE_ID

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-05',
  devtools: { enabled: true },
  srcDir: '.',
  css: ['~/assets/css/main.css', 'vue-sonner/style.css'],
  modules: ['@nuxtjs/color-mode', '@nuxt/content', 'nuxt-shiki', 'nuxt-og-image', '@nuxt/image', '@nuxt/fonts'],
  components: [
    { path: '~/components', ignore: ['_internal/*', '_internal/**/*', 'examples/*', 'examples/**/*'] },
    { path: '~/components/demo', pathPrefix: false },
    { path: '~/components/content', global: true, pathPrefix: false },
    {
      path: '~/registry/new-york-v4/ui/accordion',
      global: true,
      pathPrefix: false,
      ignore: ['*.ts'],
    },
  ],
  content: {
    build: {
      markdown: {
        highlight: false,
      },
    },
    database: {
      type: 'd1',
      bindingName: 'DB',
    },
    // required to prevent error related to better-sqlite3 during build and deploy
    experimental: {
      sqliteConnector: 'native',
    },
  },
  shiki: {
    defaultTheme: {
      light: 'github-light-default',
      dark: 'github-dark',
    },
    bundledLangs: [
      'ts',
      'tsx',
      'js',
      'vue',
      'html',
      'json',
      'bash',
      'astro',
      'toml',
    ],
  },
  vite: {
    optimizeDeps: {
      include: [
        '@lucide/vue',
        '@vueuse/core',
        'class-variance-authority',
        'clsx',
        'reka-ui',
        'tailwind-merge',
      ],
    },
    plugins: [tailwindcss() as any],
    ssr: {
      noExternal: [
        '@tabler/icons-vue',
        '@lucide/vue',
        '@hugeicons/vue',
        '@hugeicons/core-free-icons',
        '@phosphor-icons/vue',
        '@remixicon/vue',
      ],
    },
  },
  build: {
    transpile: ['vee-validate', 'vue-sonner'],
  },
  routeRules: {
    // Static assets - immutable, long cache
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    // OG images are generated on demand by the Cloudflare Worker. Keeping them
    // out of the prerender crawler avoids renderer timeouts during builds.
    '/_og/**': { prerender: false },
    // Pages - prerender as static (reset on each deploy)
    '/docs/**': { prerender: true },
    '/blocks/**': { prerender: true },
    '/charts/**': { prerender: true },
    '/examples/**': { prerender: true },
    '/colors/**': { prerender: true },
    '/themes': { prerender: true },
    // JSON API - edge-cached at CF, survives across Worker invocations
    '/api/**': {
      headers: {
        'cache-control': 'public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400',
      },
    },
    // Raw markdown endpoint
    '/raw/**': {
      headers: {
        'cache-control': 'public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400',
      },
    },
  },
  nitro: {
    preset: 'cloudflare-module',
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      failOnError: false,
      autoSubfolderIndex: false,
    },
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
      wrangler: {
        name: 'v-design',
        workers_dev: false,
        preview_urls: false,
        routes: [{ pattern: 'ui.v-xy.com', custom_domain: true }],
        d1_databases: cloudflareD1DatabaseId
          ? [{ binding: 'DB', database_name: 'v-design', database_id: cloudflareD1DatabaseId }]
          : [],
        observability: {
          logs: {
            enabled: true,
            head_sampling_rate: 1,
            invocation_logs: true,
          },
        },
      },
    },
    serverAssets: [
      { baseName: 'blocks', dir: '../registry/new-york-v4/blocks' },
    ],
  },
  app: {
    head: {
      link: [
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'shortcut icon', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        // Geist/Geist Mono are emitted eagerly by @nuxt/fonts (see `fonts.families`).
        // Other fonts are resolved on demand via useFontLoader() + unifont, which
        // still hits Bunny at runtime — hence the preconnect.
        { rel: 'preconnect', href: 'https://fonts.bunny.net', crossorigin: '' },
      ],
      meta: [{ name: 'keywords', content: 'V-Design,Nuxt,Vue,Tailwind CSS,Components,Design System' }],
    },
  },
  fonts: {
    defaults: {
      subsets: ['latin'],
      styles: ['normal'],
    },
    // `global: true` emits the @font-face into nuxt-fonts-global.css, which is both
    // how the docs get Geist without a render-blocking external stylesheet and how
    // nuxt-og-image discovers the family at build time.
    families: [
      { name: 'Geist', weights: [400, 500, 600, 700], global: true },
      { name: 'Geist Mono', weights: [400, 500], global: true },
    ],
  },
})
