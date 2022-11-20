import Login from "../PageObjects/login";
import Pages from "../PageObjects/pages";
import { Utils } from '../../support/utils';
//Modifiable Test Variables
//Constant that allows defining the url of the web application to test

const url = Utils.getUrl();
const dashboardPage = Utils.getDashboardPage();
const emailLogin = Utils.getEmail();
const passwordLogin = Utils.getPassword(); 
const escenario = "15_pages_list";

//Test setup
describe('Pages list', () => {
    it(escenario, () => {
        const login = new Login();
        const pages = new Pages();
        Utils.pruebaID_reset();               
        login.login(url, emailLogin, passwordLogin, escenario);
        cy.url().should('be.equal', dashboardPage);        
        let listPages = pages.getListPages(emailLogin, escenario);
        Utils.delay();
        cy.get(listPages).should('have.length.greaterThan', 0)
    })
})

