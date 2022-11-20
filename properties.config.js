const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "afe9c4fe-6184-11ed-9b6a-0242ac120002",
  env: {
    appName: "Testing Ghost With Cypress",
    delay: 1000
  },
  pageLoadTimeout: 300000,
  videosFolder: "./results",
  e2e: {
    setupNodeEvents(on, config) {},    
    specPattern: "cypress/integration/**/*.spec.{js,jsx,ts,tsx}",
  },
});
