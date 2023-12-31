export default defineNuxtConfig({
  css: [
    '@/assets/styles/main.scss'
  ],

  experimental: {
    typedPages: true
  },

  modules: [
    ['@nuxtjs/tailwindcss', { viewer: false }],
    '@vueuse/nuxt',
    '@element-plus/nuxt',
    '@nuxtjs/supabase',
    '@pinia/nuxt'
  ],

  ssr: false,

  app: {
    head: {
      title: 'Photographer'
    }
  }
})
