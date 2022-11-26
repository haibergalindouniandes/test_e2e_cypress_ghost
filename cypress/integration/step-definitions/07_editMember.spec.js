//Imports libreries
const faker = require("faker");
import { Utils } from '../../support/utils';
import Login from "../PageObjects/login";
import Member from "../PageObjects/member";

//Modifiable Test Variables
//Constant that allows defining the url of the web application to test

const url = Utils.getUrl();
const dashboardPage = Utils.getDashboardPage();
const memberPage = Utils.getMemberPage();
const emailLogin = Utils.getEmail();
const passwordLogin = Utils.getPassword(); 
const escenario1 = "07_edit_member/faker/Valid_email";
const escenario2 = "07_edit_member/faker/Invalid_email";
const escenario3 = "07_edit_member/faker/Name_naughty_string";
const escenario4 = "07_edit_member/faker/Name_empty";
const escenario5 = "07_edit_member/faker/Note_naughty_string";
const escenario6 = "07_edit_member/faker/Note_greater_500_characters";


//Test setup
describe('Edit  Member', () => {
    it(escenario1, () => {
        const login = new Login();
        const member = new Member();
        Utils.pruebaID_reset();
        login.login(url, emailLogin, passwordLogin, escenario1);
        for(let i = 0; i < Utils.getIterations(); i++) {
            const name = faker.name.firstName();
            const emailAdrress = faker.internet.email();
            const label = faker.lorem.word(5);
            const notes = faker.lorem.word(5);
            member.editMember(name, emailAdrress, label, notes, emailLogin, escenario1); 
             
        };
    })
    
    it(escenario2, () => {
        const login = new Login();
        const member = new Member();        
        login.login(url, emailLogin, passwordLogin, escenario2);
        for(let i = 0; i < Utils.getIterations(); i++) {
            const name = faker.name.firstName();
            const emailAdrress = faker.lorem.word(5);
            const label = faker.lorem.word(5);
            const notes = faker.lorem.word(5);
            member.editMember(name, emailAdrress, label, notes, emailLogin, escenario2);      
              
        };
    })

})
