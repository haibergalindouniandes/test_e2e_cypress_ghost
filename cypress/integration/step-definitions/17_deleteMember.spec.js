//Imports libreries
const faker = require("faker");
import { Utils } from '../../support/utils';
import Login from '../PageObjects/login';
import Member from "../PageObjects/member";

//Modifiable Test Variables
//Constant that allows defining the url of the web application to test

const url = Utils.getUrl();
const dashboardPage = Utils.getDashboardPage();
const memberPage = Utils.getMemberPage();
const emailLogin = Utils.getEmail();
const passwordLogin = Utils.getPassword(); 
const escenario = "17_delete_member";

//Test setup
describe('Delete  Member', () => {
    it(escenario, () => {
        const login = new Login();
        const member = new Member();        
        Utils.pruebaID_reset();
        login.login(url, emailLogin, passwordLogin, escenario);
        cy.url().should('be.equal', dashboardPage);
        member.deleteMember(emailLogin, escenario);        
        cy.url().should('be.equal', memberPage);      
    });
})
