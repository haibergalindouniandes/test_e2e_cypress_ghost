import Login from "../PageObjects/login";
import Posts from "../PageObjects/posts";
import { Utils } from '../../support/utils';
//Modifiable Test Variables
//Constant that allows defining the url of the web application to test

const url = Utils.getUrl();
const emailLogin = Utils.getEmail();
const passwordLogin = Utils.getPassword();
const escenario = "12_posts_list";

//Test setup
describe('Posts list', () => {
    it(escenario, () => {        
        const posts = new Posts();
        const login = new Login();      
        Utils.pruebaID_reset();               
        login.login(url, emailLogin, passwordLogin, escenario);                               
        let listPosts = posts.getListPosts(emailLogin, escenario);
        cy.get(listPosts).should('have.length.greaterThan', 0)
    })
})

