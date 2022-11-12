const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'afe9c4fe-6184-11ed-9b6a-0242ac120002',
  env: {
    appName: 'Testing Ghost With Cypress',
    delay: 1000,
    emailLogin: 'h.galindos@uniandes.edu.co',
    passwordLogin: 'Zl@ifer619',
    dashboardPage: 'http://localhost:2368/ghost/#/dashboard',
    pagesPage: 'http://localhost:2368/ghost/#/pages/121',
    staffPage: 'http://localhost:2368/ghost/#/settings/staff',
    settingsGeneralPage: 'http://localhost:2368/ghost/#/settings/general'
  },
  pageLoadTimeout: 300000,
  videosFolder: './results',
  e2e: {
    setupNodeEvents(on, config) { },
    //Url a vistar: 'http://localhost:2368/ghost/'
    baseUrl: 'http://localhost:2368/ghost/',
    specPattern: 'cypress/integration/**/*.spec.{js,jsx,ts,tsx}',
  },
})
