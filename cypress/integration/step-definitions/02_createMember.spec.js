//Imports libreries
const faker = require("faker");
import { Utils } from "../../support/utils";
import Login from "../PageObjects/login";
import Member from "../PageObjects/member";

//Modifiable Test Variables
//Constant that allows defining the url of the web application to test

const url = Utils.getUrl();
const dashboardPage = Utils.getDashboardPage();
const memberPage = Utils.getMemberPage();
const emailLogin = Utils.getEmail();
const passwordLogin = Utils.getPassword(); 
const escenario = "02_create_member";


//Test setup
describe("Create  Member", () => {
  it(escenario, () => {
    const login = new Login();
    const member = new Member();
    const name = faker.name.firstName();
    const emailAdrress = faker.internet.email();
    const label = faker.lorem.word(5);
    const notes = faker.lorem.text();
    Utils.pruebaID_reset();
    login.login(url, emailLogin, passwordLogin, escenario);
    cy.url().should("be.equal", dashboardPage);
    member.createMember(name, emailAdrress, label, notes, emailLogin, escenario);
    cy.url().should("be.equal", memberPage);
    member.listMembers().should("contain", name);
  });
});
