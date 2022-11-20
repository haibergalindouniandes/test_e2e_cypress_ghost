import Login from "../PageObjects/login";
import Posts from "../PageObjects/posts";
import { Utils } from '../../support/utils';

//Modifiable Test Variables
//Constant that allows defining the url of the web application to test
const url = Utils.getUrl();
const emailLogin = Utils.getEmail();
const passwordLogin = Utils.getPassword();
const escenario = "19_delete_post";

//Test setup
describe(escenario, () => {
    it(`Should delete post`, () => {        
        const posts = new Posts();        
        const login = new Login(); 
        Utils.pruebaID_reset();               
        login.login(url, emailLogin, passwordLogin, escenario);         
        posts.deleteFirstPost(emailLogin, escenario); 
    })    
})

