const faker = require("faker");

import Login from "../PageObjects/login2";
import Posts from "../PageObjects/posts";
import { Utils } from '../../support/utils';

//Modifiable Test Variables
//Constant that allows defining the url of the web application to test
const executeInstance = Utils.getRandomInt(0, 10000000);
const url = Cypress.env('url') || "http://localhost:2368/ghost/#/dashboard";
const emailLogin = Cypress.env('emailLogin') || "edgariel2004@gmail.com";
const passwordLogin = Cypress.env('passwordLogin') || "1234512345";
const dashboardPage = Cypress.env('dashboardPage') || "http://localhost:2368/ghost/#/dashboard";

//Test setup
describe('Create post', () => {
    it(`Should create post [ID_${executeInstance}]`, () => {
        const login = new Login();
        const posts = new Posts();

        //crear variables aleatorias que simulen un post
        const postTitle = faker.commerce.product();
        const postContent = faker.commerce.productDescription();
        
        //login.setInstance(executeInstance);
        login.login(url, emailLogin, passwordLogin);
        //cy.url().should('be.equal', dashboardPage);
        posts.setInstance(executeInstance);
        posts.createPost(postTitle, postContent);
    })
})

