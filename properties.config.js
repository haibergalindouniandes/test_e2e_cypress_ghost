const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "afe9c4fe-6184-11ed-9b6a-0242ac120002",
  env: {
    appName: "Testing Ghost With Cypress",
    delay: 1000,
    emailLogin: "miso@miso.com",
    passwordLogin: "miso123456",
    newPassword: "miso123456",
    dashboardPage: "http://localhost:3001/8/ghost/#/dashboard",
    pagesPage: "http://localhost:3001/ghost/#/pages/121",
    staffPage: "http://localhost:3001/ghost/#/settings/staff",
    memberPage: "http://localhost:3001/ghost/#/members",
    settingsGeneralPage: "http://localhost:3001/ghost/#/settings/general",
  },
  pageLoadTimeout: 300000,
  videosFolder: "./results",
  e2e: {
    setupNodeEvents(on, config) {},
    //Url a vistar: 'http://localhost:2368/ghost/'
    baseUrl: "http://localhost:3001/ghost/",
    specPattern: "cypress/integration/**/*.spec.{js,jsx,ts,tsx}",
  },
});
