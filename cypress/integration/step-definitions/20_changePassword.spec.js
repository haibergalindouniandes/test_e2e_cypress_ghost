//Imports libreries
const faker = require("faker");
import { Utils } from '../../support/utils';
import Login from '../PageObjects/login';
import Staff from "../PageObjects/staff";
//Modifiable Test Variables
//Constant that allows defining the url of the web application to test

const url = Utils.getUrl();
const dashboardPage = Utils.getDashboardPage();
const staffPage = Utils.getStaffPage();
const emailLogin = Utils.getEmail();
const passwordLogin = Utils.getPassword(); 
const newPassword = Utils.getNewPassword();
const escenario = "20_change_password";

//Test setup
describe('Change Password', () => {
    it(escenario, () => {
        const login = new Login();
        const staff = new Staff();       
        Utils.pruebaID_reset();
        login.login(url, emailLogin, passwordLogin, escenario); 
        cy.url().should('be.equal', dashboardPage);
        staff.changePassword(passwordLogin, newPassword, emailLogin, escenario);
        cy.url().should('be.equal', staffPage);        
    });
})
