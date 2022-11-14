//Imports libreries
const faker = require("faker");
import { Utils } from '../../support/utils';
import Login from "../PageObjects/login";
import Member from "../PageObjects/member";

//Modifiable Test Variables
//Constant that allows defining the url of the web application to test
const executeInstance = Utils.getRandomInt(0, 10000000);
const emailLogin = Cypress.env('emailLogin') || "miso@miso.com";
const passwordLogin = Cypress.env('passwordLogin') || "miso123456";
const dashboardPage = Cypress.env('dashboardPage') || "http://localhost:3001/ghost/#/dashboard";
const memberPage = Cypress.env('memberPage') || "http://localhost:3001/ghost/#/members";

//Test setup
describe('Delete  Member', () => {
    it(`Delete Member [ID_${executeInstance}]`, () => {
        const login = new Login();
        const member = new Member();
        const note = faker.lorem.text();
        login.setInstance(executeInstance);
        login.login(emailLogin, passwordLogin);
        cy.url().should('be.equal', dashboardPage);
        member.setInstance(executeInstance);
        member.deleteMember();        
        cy.url().should('be.equal', memberPage);      
    });
})
