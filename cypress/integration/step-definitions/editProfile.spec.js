//Imports libreries
const faker = require("faker");
import Login from "../PageObjects/login";
import { Utils } from '../../support/utils';
import { default as pro } from "../PageObjects/profile";

//Modifiable Test Variables
//Constant that allows defining the url of the web application to test
const executeInstance = Utils.getRandomInt(0, 10000000);
const emailLogin = Cypress.env('emailLogin') || "h.galindos@uniandes.edu.co";
const passwordLogin = Cypress.env('passwordLogin') || "Zl@ifer619";
const dashboardPage = Cypress.env('dashboardPage') || "http://localhost:2368/ghost/#/dashboard";

//Test setup
describe('Edit my profile information', () => {
    it(`Should edit my profile information [ID_${executeInstance}]`, () => {
        const login = new Login();
        const profile = new pro();
        const fullName = faker.name.firstName();
        const slug = faker.name.lastName();
        const location = faker.address.streetAddress(true);
        const website = faker.internet.avatar();
        const bio = faker.lorem.sentence();
        login.setInstance(executeInstance);
        login.login(emailLogin, passwordLogin);
        cy.url().should('be.equal', dashboardPage);
        profile.setInstance(executeInstance);
        profile.editProfile(fullName, slug, location, website, bio);
        profile.fullName().invoke('val').should('be.equal', fullName)
        profile.slug().invoke('val').should('be.equal', slug.toLowerCase())
        profile.location().invoke('val').should('be.equal', location)
        profile.website().invoke('val').should('be.equal', website)
        profile.bio().invoke('val').should('be.equal', bio)
    })
})