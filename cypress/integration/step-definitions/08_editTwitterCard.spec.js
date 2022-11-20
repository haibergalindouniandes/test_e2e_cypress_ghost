//Imports libreries
const faker = require("faker");
import Login from "../PageObjects/login";
import GeneralSettings from "../PageObjects/generalSettings";
import { Utils } from '../../support/utils';
//Modifiable Test Variables
//Constant that allows defining the url of the web application to test

const url = Utils.getUrl();
const dashboardPage = Utils.getDashboardPage();
const emailLogin = Utils.getEmail();
const passwordLogin = Utils.getPassword(); 
const escenario = "08_edit_twitter_card";

//Test setup
describe('Edit twitter card', () => {
    it(escenario, () => {
        const login = new Login();
        const generalSettings = new GeneralSettings();
        const twitterTitle = faker.random.words();
        const twitterDescription = faker.lorem.sentence();
        Utils.pruebaID_reset();               
        login.login(url, emailLogin, passwordLogin, escenario);
        cy.url().should('be.equal', dashboardPage);
        generalSettings.editTimeCardTwiter(twitterTitle, twitterDescription, emailLogin, escenario);
        Utils.delay(4000);
        generalSettings.twitterTitle().invoke('val').should('be.equal', twitterTitle)
        generalSettings.twitterDescription().invoke('val').should('be.equal', twitterDescription)
    })
})

