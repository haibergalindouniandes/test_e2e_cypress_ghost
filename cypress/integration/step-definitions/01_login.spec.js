const faker = require("faker");
import Login from "../PageObjects/login";
import { Utils } from '../../support/utils';

//Modifiable Test Variables
//Constant that allows defining the url of the web application to test

const url = Utils.getUrl();
const dashboardPage = Utils.getDashboardPage();
const emailLogin = Utils.getEmail();
const passwordLogin = Utils.getPassword(); 
const escenario = "01_login";

//Test setup
describe('Login', () => {
    it(escenario, () => {
        const login = new Login();        
        Utils.pruebaID_reset();               
        login.login(url, emailLogin, passwordLogin, escenario);        
        cy.url().should('be.equal', dashboardPage);
    })
})

