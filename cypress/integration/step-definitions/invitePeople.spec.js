//Imports libreries
const faker = require("faker");
import { Utils } from '../../support/utils';
import Login from "../PageObjects/login";
import Staff from "../PageObjects/staff";
//Modifiable Test Variables
//Constant that allows defining the url of the web application to test
const executeInstance = Utils.getRandomInt(0, 10000000);
const emailLogin = Cypress.env('emailLogin') || "h.galindos@uniandes.edu.co";
const passwordLogin = Cypress.env('passwordLogin') || "Zl@ifer619";
const dashboardPage = Cypress.env('dashboardPage') || "http://localhost:2368/ghost/#/dashboard";
const staffPage = Cypress.env('staffPage') || "http://localhost:2368/ghost/#/settings/staff";

//Test setup
describe('Invite people', () => {
    it(`Should send invitation people [ID_${executeInstance}]`, () => {
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
    });
})
