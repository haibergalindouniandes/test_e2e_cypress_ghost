import Login from "../PageObjects/login";
import Pages from "../PageObjects/pages";
import { Utils } from '../../support/utils';

//Modifiable Test Variables
//Constant that allows defining the url of the web application to test

const url = Utils.getUrl();
const emailLogin = Utils.getEmail();
const passwordLogin = Utils.getPassword();
const escenario = "03_Create_page";

//Test setup
describe('Create page', () => {
    it(escenario, () => {        
        const pages = new Pages();        
        const login = new Login();                
        login.login(url, emailLogin, passwordLogin, escenario);         
        pages.createPage(emailLogin, escenario);
    })    
})

