//Imports libreries
const faker = require("faker");
const { Mockaroo } = require('../../data-generators/mockaroo');
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
const escenario = '02_create_member';

//Test using data pool a priori (DDP)
describe('Create Member With Dynamic DataPool', () => {
  beforeEach(async function () {
    const mockaroo = new Mockaroo();
    const dataAccounts = await mockaroo.getData(Utils.getEndPointMockarooAccounts(), Utils.getApikeyMockarooAccounts());
    this.accountData = dataAccounts;
  })

  // Test scenario successful creation of a member (DDP)
  it(`${escenario}_DDP_SuccessData`, function () {
    const login = new Login();
    const member = new Member();
    Utils.pruebaID_reset();
    login.login(url, emailLogin, passwordLogin, escenario);
    cy.url().should("be.equal", dashboardPage);
    let memberToCreate = this.accountData[Utils.getRandomInt(0, this.accountData.length - 1)];
    cy.log(memberToCreate);
    member.createMember(memberToCreate.full_name, memberToCreate.email, memberToCreate.labels,
      Utils.sliceString(memberToCreate.note, 499), emailLogin, escenario);
    cy.url().should("be.equal", memberPage);
    member.listMembers().should("contain", memberToCreate.full_name);
  })

})


// Test using data pool a priori (DPAP)
describe('Create Member With DataPool A Priori', () => {
  beforeEach(async function () {
    const dataAccountsFixture = await cy.fixture('Accounts.json');
    this.accountDataFixture = dataAccountsFixture;
  })

  // Test scenario successful creation of a member (DPAP)
  it(`${escenario}_DPAP_SuccessData`, function () {
    cy.log(this.accountDataFixture)
    const login = new Login();
    const member = new Member();
    Utils.pruebaID_reset();
    login.login(url, emailLogin, passwordLogin, escenario);
    cy.url().should("be.equal", dashboardPage);
    let memberToCreate = this.accountDataFixture[Utils.getRandomInt(0, this.accountDataFixture.length - 1)];
    cy.log(memberToCreate);
    member.createMember(memberToCreate.full_name, memberToCreate.email, memberToCreate.labels,
      Utils.sliceString(memberToCreate.note, 499), emailLogin, escenario);
    cy.url().should("be.equal", memberPage);
    member.listMembers().should("contain", memberToCreate.full_name);
  })

})


//Test using data online with Faker (OFD)
describe('Create Member With Faker', () => {

  // Test scenario successful creation of a member (OFD)
  it(`${escenario}_OFD_SuccessData`, function () {
    const login = new Login();
    const member = new Member();
    let fullName = faker.name.firstName().concat(" ", faker.name.lastName());
    Utils.pruebaID_reset();
    login.login(url, emailLogin, passwordLogin, escenario);
    cy.url().should("be.equal", dashboardPage);
    member.createMember(fullName, faker.internet.email(), faker.random.word(),
      Utils.sliceString(faker.lorem.words(600), 499), emailLogin, escenario);
    cy.url().should("be.equal", memberPage);
    member.listMembers().should("contain", fullName);
  })

})