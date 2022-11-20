const faker = require("faker");
import Login from "../PageObjects/login";
import Posts from "../PageObjects/posts";
import { Utils } from '../../support/utils';

//Modifiable Test Variables
//Constant that allows defining the url of the web application to test

const url = Utils.getUrl();
const dashboardPage = Utils.getDashboardPage();
const emailLogin = Utils.getEmail();
const passwordLogin = Utils.getPassword(); 
const escenario = "10_publish_post";

//Test setup
describe('publish post', () => {
    it(escenario, () => {
        const login = new Login();
        const posts = new Posts();
        const postTitle = faker.commerce.product();
        const postContent = faker.commerce.productDescription();        
        Utils.pruebaID_reset();               
        login.login(url, emailLogin, passwordLogin, escenario);  
        cy.url().should('be.equal', dashboardPage);        
        posts.publishPost(postTitle,postContent, emailLogin, escenario);
    })
})

