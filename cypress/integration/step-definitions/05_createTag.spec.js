import Login from "../PageObjects/login";
import Tag from '../PageObjects/tag';
import { Utils } from '../../support/utils';

//Modifiable Test Variables
//Constant that allows defining the url of the web application to test

const url = Utils.getUrl();
const emailLogin = Utils.getEmail();
const passwordLogin = Utils.getPassword(); 
const escenario = "05_create_tag";

//Test setup
describe('Create tag', () => {
    it(escenario, () => {        
        const tag = new Tag();
        const login = new Login();                
        Utils.pruebaID_reset();
        login.login(url, emailLogin, passwordLogin, escenario);
        tag.createTag(emailLogin, escenario);
    })    
})

