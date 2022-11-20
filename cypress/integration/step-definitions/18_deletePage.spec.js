import Login from "../PageObjects/login";
import Pages from "../PageObjects/pages";
import { Utils } from '../../support/utils';
//Modifiable Test Variables
//Constant that allows defining the url of the web application to test

const url = Utils.getUrl();
const dashboardPage = Utils.getDashboardPage();
const emailLogin = Utils.getEmail();
const passwordLogin = Utils.getPassword(); 
const escenario = "18_delete_page";

//Test setup
describe('Delete page', () => {
    it(escenario, () => {
        const login = new Login();
        const pages = new Pages();
        Utils.pruebaID_reset();               
        login.login(url, emailLogin, passwordLogin, escenario);
        cy.url().should('be.equal', dashboardPage);
        pages.deleteFirstPage(emailLogin, escenario);
    })
})

