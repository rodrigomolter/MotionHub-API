import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'localhost:3333',
    env: {
      hideCredentials: true,
      requestMode: true,
    },
    experimentalRunAllSpecs: true,
  },
  video: false,
  chromeWebSecurity: false,
})
