import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    chromeWebSecurity: false,
    env: {
      dashboard_base_url: "https://dashboard.mailerlite.com/",
      signin_url: "https://accounts.mailerlite.com/",
    },
    // Enable this in CI only.
    // reporter: 'cypress-mochawesome-reporter',
    specPattern: "cypress/e2e/*.spec.ts",
    viewportWidth: 1280,
  },
});
