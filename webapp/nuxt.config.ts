// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
  ],

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/api/quickmemos/**": {
      proxy: `${process.env.API_BASE_URL || process.env.NUXT_API_BASE_URL || "http://server:3500"}/**`,
    },
  },
  runtimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL || process.env.NUXT_API_BASE_URL,
    public: {
      apiBaseUrl: process.env.API_BASE_URL || process.env.NUXT_API_BASE_URL,
    },
  }
});
