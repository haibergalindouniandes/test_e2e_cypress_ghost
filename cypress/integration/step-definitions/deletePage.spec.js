import Login from "../PageObjects/login";
import Pages from "../PageObjects/pages";
import { Utils } from '../../support/utils';
//Modifiable Test Variables
//Constant that allows defining the url of the web application to test
const executeInstance = Utils.getRandomInt(0, 10000000);
const emailLogin = Cypress.env('emailLogin') || "h.galindos@uniandes.edu.co";
const passwordLogin = Cypress.env('passwordLogin') || "Zl@ifer619";
const dashboardPage = Cypress.env('dashboardPage') || "http://localhost:2368/ghost/#/dashboard";

//Test setup
describe('Delete page', () => {
    it(`Should delete page [ID_${executeInstance}]`, () => {
        const login = new Login();
        const pages = new Pages();
        login.setInstance(executeInstance);
        login.login(emailLogin, passwordLogin);
        cy.url().should('be.equal', dashboardPage);
        pages.setInstance(executeInstance);
        pages.deleteFirstPage();
    })
})

