export default {
  head: {
    title: 'EWMA',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  publicRuntimeConfig: {
    apiKey: 'f62f750b70a8ef11dad44670cfb6aa57',
    imagePrefix: 'https://image.tmdb.org/t/p/w500'
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  plugins: [
    '~/plugins/fontawesome.js',
    { src: '~/plugins/star-rating.js', mode: 'client' },
    { src: '~/plugins/datepicker.js', mode: 'client' }
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: '/'
  },

  build: {
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    }
  }
}
