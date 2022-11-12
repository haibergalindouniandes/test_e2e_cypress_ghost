//Imports libreries
const faker = require("faker");
import Login from "../PageObjects/login";
import GeneralSettings from "../PageObjects/generalSettings";
import { Utils } from '../../support/utils';
//Modifiable Test Variables
//Constant that allows defining the url of the web application to test
const executeInstance = Utils.getRandomInt(0, 10000000);
const emailLogin = Cypress.env('emailLogin') || "h.galindos@uniandes.edu.co";
const passwordLogin = Cypress.env('passwordLogin') || "Zl@ifer619";
const dashboardPage = Cypress.env('dashboardPage') || "http://localhost:2368/ghost/#/dashboard";

//Test setup
describe('Edit twitter card', () => {
    it(`Should edit the twitter card in the general settings [ID_${executeInstance}]`, () => {
        const login = new Login();
        const generalSettings = new GeneralSettings();
        const twitterTitle = faker.random.words();
        const twitterDescription = faker.lorem.sentence();
        login.setInstance(executeInstance);
        login.login(emailLogin, passwordLogin);
        cy.url().should('be.equal', dashboardPage);
        generalSettings.setInstance(executeInstance);
        generalSettings.editTimeCardTwiter(twitterTitle, twitterDescription);
        Utils.delay(4000);
        generalSettings.twitterTitle().invoke('val').should('be.equal', twitterTitle)
        generalSettings.twitterDescription().invoke('val').should('be.equal', twitterDescription)
    })
})

