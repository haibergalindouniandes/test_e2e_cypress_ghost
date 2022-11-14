//Imports libreries
const faker = require("faker");
import { Utils } from '../../support/utils';
import Login from "../PageObjects/login";
import Staff from "../PageObjects/staff";
//Modifiable Test Variables
//Constant that allows defining the url of the web application to test
const executeInstance = Utils.getRandomInt(0, 10000000);
const emailLogin = Cypress.env('emailLogin') || "miso@miso.com";
const passwordLogin = Cypress.env('passwordLogin') || "miso123456";
const dashboardPage = Cypress.env('dashboardPage') || "http://localhost:3001/ghost/#/dashboard";
const staffPage = Cypress.env('staffPage') || "http://localhost:3001/ghost/#/settings/staff";

//Test setup
describe('Create  Account', () => {
    it(`Create_Delete Account and send invitation people [ID_${executeInstance}]`, () => {
        const login = new Login();
        const staff = new Staff();
        const emailAdrress = faker.internet.email();
        login.setInstance(executeInstance);
        login.login(emailLogin, passwordLogin);
        cy.url().should('be.equal', dashboardPage);
        staff.setInstance(executeInstance);
        staff.sendInvitation(emailAdrress);
        cy.url().should('be.equal', staffPage);
        staff.listPeopleInvited().should('contain', emailAdrress);
        staff.revokeInvitation(emailAdrress);
    });
})
