const faker = require("faker");
import Login from "../PageObjects/login";
import Posts from "../PageObjects/posts";
import { Utils } from '../../support/utils';

//Modifiable Test Variables
//Constant that allows defining the url of the web application to test

const url = Utils.getUrl();
const emailLogin = Utils.getEmail();
const passwordLogin = Utils.getPassword(); 
const escenario = "04_create_post";

//Test setup
describe('Create post', () => {
    it(escenario, () => {
        const login = new Login();
        const posts = new Posts();        
        const postTitle = faker.commerce.product();
        const postContent = faker.commerce.productDescription();
        Utils.pruebaID_reset();
        login.login(url, emailLogin, passwordLogin, escenario);
        posts.createPost(postTitle, postContent, emailLogin, escenario);
    })
})

