import Login from "../PageObjects/login";
import Pages from "../PageObjects/pages";
import { Utils } from '../../support/utils';

//Modifiable Test Variables
//Constant that allows defining the url of the web application to test

const url = Utils.getUrl();
const emailLogin = Utils.getEmail();
const passwordLogin = Utils.getPassword();
const escenario = "13_modify_page";

//Test setup
describe('Modify published page', () => {
    it(escenario, () => {        
        const pages = new Pages();        
        const login = new Login();                
        Utils.pruebaID_reset();               
        login.login(url, emailLogin, passwordLogin, escenario); 
        pages.modifyPage(emailLogin, escenario);
    })    
})

