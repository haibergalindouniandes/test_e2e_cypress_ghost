import Login2 from "../PageObjects/login2";
import Posts from "../PageObjects/posts";
import { Utils } from '../../support/utils';
//Modifiable Test Variables
//Constant that allows defining the url of the web application to test
const executeInstance = Utils.getRandomInt(0, 10000000);
const url = Cypress.env('url') || "http://localhost:2369/ghost/#/signin";
const emailLogin = Cypress.env('emailLogin') || "jm.carrillo@uniandes.edu.co";
const passwordLogin = Cypress.env('passwordLogin') || "Jorge.2020";

//Test setup
describe('Posts list', () => {
    it(`Should list posts [ID_${executeInstance}]`, () => {        
        const posts = new Posts();
        const login = new Login2();      
        login.login(url, emailLogin, passwordLogin);      
        posts.setInstance(executeInstance);                       
        let listPosts = posts.getListPosts();
        cy.get(listPosts).should('have.length.greaterThan', 0)
    })
})

