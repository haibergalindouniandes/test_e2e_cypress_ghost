import Login2 from "../PageObjects/login2";
import Pages from "../PageObjects/pages";
import { Utils } from '../../support/utils';

//Modifiable Test Variables
//Constant that allows defining the url of the web application to test
const executeInstance = Utils.getRandomInt(0, 10000000);
const url = Cypress.env('url') || "http://localhost:3001/ghost/#/signin";
const emailLogin = Cypress.env('emailLogin') || "miso@miso.com";
const passwordLogin = Cypress.env('passwordLogin') || "miso123456";

//Test setup
describe('Create page', () => {
    it(`Should create page [ID_${executeInstance}]`, () => {        
        const pages = new Pages();        
        const login = new Login2();                
        login.login(url, emailLogin, passwordLogin); 
        pages.setInstance(executeInstance);
        pages.createPage();
    })    
})

