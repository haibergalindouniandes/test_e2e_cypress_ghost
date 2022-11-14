import Login2 from "../PageObjects/login2";
import Tag from '../PageObjects/tag';
import { Utils } from '../../support/utils';

//Modifiable Test Variables
//Constant that allows defining the url of the web application to test
const executeInstance = Utils.getRandomInt(0, 10000000);
const url = Cypress.env('url') || "http://localhost:2368/ghost/#/dashboard";
const emailLogin = Cypress.env('emailLogin') || "edgariel2004@gmail.com";
const passwordLogin = Cypress.env('passwordLogin') || "1234512345";

//Test setup
describe('Create tag', () => {
    it(`Should create a tag [ID_${executeInstance}]`, () => {        
        const tag = new Tag();
        const login = new Login2();                
        login.login(url, emailLogin, passwordLogin);                  
        tag.setInstance(executeInstance);
        tag.createTag();
    })    
})

