//Imports libreries
const faker = require("faker");
import Login from "../PageObjects/login";
import { Utils } from '../../support/utils';
import { default as pro } from "../PageObjects/profile";

//Modifiable Test Variables
//Constant that allows defining the url of the web application to test

const url = Utils.getUrl();
const dashboardPage = Utils.getDashboardPage();
const emailLogin = Utils.getEmail();
const passwordLogin = Utils.getPassword(); 
const escenario = "09_edit_profile_info";

//Test setup
describe('Edit my profile information', () => {
    it(escenario, () => {
        const login = new Login();
        const profile = new pro();
        const fullName = faker.name.firstName();
        const slug = faker.name.lastName();
        const location = faker.address.streetAddress(true);
        const website = faker.internet.avatar();
        const bio = faker.lorem.sentence();        
        Utils.pruebaID_reset();               
        login.login(url, emailLogin, passwordLogin, escenario);
        cy.url().should('be.equal', dashboardPage);
        profile.editProfile(fullName, slug, location, website, bio, emailLogin, escenario);
        profile.fullName().invoke('val').should('be.equal', fullName)
        profile.slug().invoke('val').should('be.equal', slug.toLowerCase())
        profile.location().invoke('val').should('be.equal', location)
        profile.website().invoke('val').should('be.equal', website)
        profile.bio().invoke('val').should('be.equal', bio)
    })
})