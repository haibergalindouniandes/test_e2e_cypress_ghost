//Imports libreries
const faker = require("faker");
const { Mockaroo } = require('../../data-generators/mockaroo');
import { Utils } from "../../support/utils";
import Login from "../PageObjects/login";
import Member from "../PageObjects/member";

//Modifiable Test Variables
//Constant that allows defining the url of the web application to test
const login = new Login();
const member = new Member();
const mockaroo = new Mockaroo();
const url = Utils.getUrl();
const loginPage = Utils.getUrl();
const dashboardPage = Utils.getDashboardPage();
const memberPage = Utils.getMemberPage();
const emailLogin = Utils.getEmail();
const passwordLogin = Utils.getPassword();
const escenario = '02_create_member';

//////////////////////////// Test using dinamic data pool (DDP)
describe('Create Member With Dynamic DataPool', () => {
  beforeEach(async function () {
    const dataAccounts = await mockaroo.getData(Utils.getEndPointMockarooAccounts(), Utils.getApikeyMockarooAccounts());
    this.accountData = dataAccounts;
  })

  // Test scenario successful creation of a member (DDP)
  it(`${escenario}/DDP/SuccessData`, function () {
    for (let index = 0; index < Utils.getIterations(); index++) {
      let memberToCreate = this.accountData[Utils.getRandomInt(0, this.accountData.length - 1)];
      let data = {
        fullName: memberToCreate.full_name, email: memberToCreate.email, labels: memberToCreate.labels,
        note: Utils.sliceString(memberToCreate.note, 200)
      }
      createMemberSuccess(data, `${escenario}/DDP/SuccessData`);
    }
  })

  // Test scenario where you try to create a member with an empty name and empty email (DDP)
  it(`${escenario}/DDP/EmptyValues`, function () {
    for (let index = 0; index < Utils.getIterations(); index++) {
      let memberToCreate = this.accountData[Utils.getRandomInt(0, this.accountData.length - 1)];
      let data = {
        fullName: '', email: '', labels: memberToCreate.labels,
        note: Utils.sliceString(memberToCreate.note, 200)
      }
      createMemberWithEmptyValues(data, `${escenario}/DDP/EmptyValues`);
    }
  })

  // Test scenario where you try to create a member by sending different types of data to those requested (DDP)  
  it(`${escenario}/DDP/InputValuesDifferentTypes`, function () {
    for (let index = 0; index < Utils.getIterations(); index++) {
      let memberToCreate = this.accountData[Utils.getRandomInt(0, this.accountData.length - 1)];
      let data = {
        fullName: memberToCreate.naughty_string, email: memberToCreate.naughty_string, labels: memberToCreate.naughty_string,
        note: Utils.sliceString(memberToCreate.note, 200)
      }
      createMemberWithDifferentTypes(data, `${escenario}/DDP/InputValuesDifferentTypes`);
    }
  })

  // Test scenario where you try to create a member sending min values than allowed (DDP)  
  it(`${escenario}/DDP/InputMinValuesAllowed`, function () {
    for (let index = 0; index < Utils.getIterations(); index++) {
      let memberToCreate = this.accountData[Utils.getRandomInt(0, this.accountData.length - 1)];
      let name = Utils.sliceString(memberToCreate.full_name, 1);
      let data = {
        fullName: name,
        email: Utils.sliceString(memberToCreate.numeric_large, 1).concat('@',
          Utils.sliceString(memberToCreate.numeric_large, 1)).concat('.',
            Utils.sliceString(memberToCreate.first_name, 2)),
        labels: Utils.sliceString(memberToCreate.labels, 1),
        note: Utils.sliceString(memberToCreate.note, 1)
      }
      createMemberWithMinValuesAllowed(data, `${escenario}/DDP/InputMinValuesAllowed`);
    }
  })

  // Test scenario where you try to create a member sending min values than allowed (DDP)  
  it(`${escenario}/DDP/InputMaxValuesAllowed`, function () {
    for (let index = 0; index < Utils.getIterations(); index++) {
      let memberToCreate = this.accountData[Utils.getRandomInt(0, this.accountData.length - 1)];
      let data = {
        fullName: Utils.completeString(memberToCreate.full_name, Utils.removeSpacesString(memberToCreate.string_large), 191, 'end'),
        email: Utils.completeString(memberToCreate.email, Utils.removeSpacesString(memberToCreate.string_large), 60, 'start'),
        labels: Utils.completeString(memberToCreate.labels, Utils.removeSpacesString(memberToCreate.string_large), 191, 'start'),
        note: Utils.sliceString(memberToCreate.note, 500)
      }
      createMemberWithMaxValuesAllowed(data, `${escenario}/DDP/InputMaxValuesAllowed`);
    }
  })

  // Test scenario where you try to create a member sending higher values (DDP) 
  it(`${escenario}/DDP/HigherValues`, function () {
    for (let index = 0; index < Utils.getIterations(); index++) {
      let memberToCreate = this.accountData[Utils.getRandomInt(0, this.accountData.length - 1)];
      let data = {
        fullName: Utils.completeString(memberToCreate.full_name, memberToCreate.string_large, 192, 'end'),
        email: Utils.completeString(memberToCreate.email, memberToCreate.string_large, 192, 'start'),
        labels: memberToCreate.labels,
        note: Utils.sliceString(memberToCreate.string_large, 501)
      }
      createMemberWithHigherValues(data, `${escenario}/DDP/HigherValues`);
    }
  })
})

//////////////////////////// Test using data pool a priori (DPAP)
describe('Create Member With DataPool A Priori', () => {
  beforeEach(function () {
    cy.fixture('Accounts.json').then(function (accountDataFixture) {
      this.accountDataFixture = accountDataFixture;
    })
  })
  // Test scenario successful creation of a member (DPAP)
  it(`${escenario}/DPAP/SuccessData`, function () {
    for (let index = 0; index < Utils.getIterations(); index++) {
      let memberToCreate = this.accountDataFixture[Utils.getRandomInt(0, this.accountDataFixture.length - 1)];
      let data = {
        fullName: memberToCreate.full_name, email: memberToCreate.email, labels: memberToCreate.labels,
        note: Utils.sliceString(memberToCreate.note, 499)
      }
      createMemberSuccess(data, `${escenario}/DPAP/SuccessData`);
    }
  })

  // Test scenario where you try to create a member with an empty name and empty email (DPAP)
  it(`${escenario}/DPAP/EmptyValues`, function () {
    for (let index = 0; index < Utils.getIterations(); index++) {
      let memberToCreate = this.accountDataFixture[Utils.getRandomInt(0, this.accountDataFixture.length - 1)];
      let data = {
        fullName: '', email: '', labels: memberToCreate.labels,
        note: Utils.sliceString(memberToCreate.note, 200)
      }
      createMemberWithEmptyValues(data, `${escenario}/DPAP/EmptyValues`);
    }
  })

  // Test scenario where you try to create a member by sending different types of data to those requested (DPAP)  
  it(`${escenario}/DPAP/InputValuesDifferentTypes`, function () {
    for (let index = 0; index < Utils.getIterations(); index++) {
      let memberToCreate = this.accountDataFixture[Utils.getRandomInt(0, this.accountDataFixture.length - 1)];
      let data = {
        fullName: memberToCreate.naughty_string, email: memberToCreate.naughty_string, labels: memberToCreate.naughty_string,
        note: Utils.sliceString(memberToCreate.note, 200)
      }
      createMemberWithDifferentTypes(data, `${escenario}/DPAP/InputValuesDifferentTypes`);
    }
  })

  // Test scenario where you try to create a member sending min values than allowed (DPAP)  
  it(`${escenario}/DPAP/InputMinValuesAllowed`, function () {
    for (let index = 0; index < Utils.getIterations(); index++) {
      let memberToCreate = this.accountDataFixture[Utils.getRandomInt(0, this.accountDataFixture.length - 1)];
      let name = Utils.sliceString(memberToCreate.full_name, 1);
      let data = {
        fullName: name,
        email: Utils.sliceString(memberToCreate.numeric_large, 1).concat('@',
          Utils.sliceString(memberToCreate.numeric_large, 1)).concat('.',
            Utils.sliceString(memberToCreate.first_name, 2)),
        labels: Utils.sliceString(memberToCreate.labels, 1),
        note: Utils.sliceString(memberToCreate.note, 1)
      }
      createMemberWithMinValuesAllowed(data, `${escenario}/DPAP/InputMinValuesAllowed`);
    }
  })

  // Test scenario where you try to create a member sending min values than allowed (DPAP)  
  it(`${escenario}/DPAP/InputMaxValuesAllowed`, function () {
    for (let index = 0; index < Utils.getIterations(); index++) {
      let memberToCreate = this.accountDataFixture[Utils.getRandomInt(0, this.accountDataFixture.length - 1)];
      let data = {
        fullName: Utils.completeString(memberToCreate.full_name, Utils.removeSpacesString(memberToCreate.string_large), 191, 'end'),
        email: Utils.completeString(memberToCreate.email, Utils.removeSpacesString(memberToCreate.string_large), 60, 'start'),
        labels: Utils.completeString(memberToCreate.labels, Utils.removeSpacesString(memberToCreate.string_large), 191, 'start'),
        note: Utils.sliceString(memberToCreate.note, 500)
      }
      createMemberWithMaxValuesAllowed(data, `${escenario}/DPAP/InputMaxValuesAllowed`);
    }
  })

  // Test scenario where you try to create a member sending higher values (DPAP) 
  it(`${escenario}/DPAP/HigherValues`, function () {
    for (let index = 0; index < Utils.getIterations(); index++) {
      let memberToCreate = this.accountDataFixture[Utils.getRandomInt(0, this.accountDataFixture.length - 1)];
      let data = {
        fullName: Utils.completeString(memberToCreate.full_name, memberToCreate.string_large, 192, 'end'),
        email: Utils.completeString(memberToCreate.email, memberToCreate.string_large, 192, 'start'),
        labels: memberToCreate.labels,
        note: Utils.sliceString(memberToCreate.string_large, 501)
      }
      createMemberWithHigherValues(data, `${escenario}/DPAP/HigherValues`);
    }
  })

})

//////////////////////////// Test using data online with Faker (OWF)
describe('Create Member With Faker', () => {
  // Test scenario successful creation of a member (OWF)
  it(`${escenario}/OWF/SuccessData`, function () {
    for (let index = 0; index < Utils.getIterations(); index++) {
      let fullName = faker.name.firstName().concat(" ", faker.name.lastName());
      let email = faker.internet.email();
      let labels = faker.lorem.words(2);
      let note = faker.lorem.paragraphs(50);
      let data = {
        fullName: fullName, email: email, labels: labels,
        note: Utils.sliceString(note, 499)
      }
      createMemberSuccess(data, `${escenario}/OWF/SuccessData`);
    }
  })

  // Test scenario where you try to create a member with an empty name and empty email (OWF)
  it(`${escenario}/OWF/EmptyValues`, function () {
    for (let index = 0; index < Utils.getIterations(); index++) {
      let labels = faker.lorem.words(2);
      let note = faker.lorem.paragraphs(50);
      let data = {
        fullName: '', email: '', labels: labels,
        note: Utils.sliceString(note, 200)
      }
      createMemberWithEmptyValues(data, `${escenario}/OWF/EmptyValues`);
    }
  })

  // Test scenario where you try to create a member by sending different types of data to those requested (OWF)  
  it(`${escenario}/OWF/InputValuesDifferentTypes`, function () {
    for (let index = 0; index < Utils.getIterations(); index++) {
      let fullName = faker.lorem.words(2).concat(faker.random.number({ min: 1000000000, max: 9999000000 }));
      let email = faker.random.number({ min: 1000000000, max: 9999000000 });
      let labels = faker.random.number({ min: 1000000000, max: 9999000000 });
      let note = faker.datatype.string(50);
      let data = {
        fullName: fullName, email: email, labels: labels,
        note: note
      }
      createMemberWithDifferentTypes(data, `${escenario}/OWF/InputValuesDifferentTypes`);
    }
  })

  // Test scenario where you try to create a member sending min values than allowed (OWF)  
  it(`${escenario}/OWF/InputMinValuesAllowed`, function () {
    for (let index = 0; index < Utils.getIterations(); index++) {
      let fullName = faker.lorem.words(2);
      let email = Utils.sliceString(String(faker.random.number(100))).concat('@',
        Utils.sliceString(String(faker.random.number(100)))).concat('.',
          Utils.sliceString(fullName, 2));
      let labels = faker.lorem.words(2);
      let note = faker.lorem.paragraphs(50);
      let data = {
        fullName: Utils.sliceString(fullName, 1),
        email: email,
        labels: Utils.sliceString(labels, 1),
        note: Utils.sliceString(note, 1)
      }
      createMemberWithMinValuesAllowed(data, `${escenario}/OWF/InputMinValuesAllowed`);
    }
  })

  // Test scenario where you try to create a member sending min values than allowed (OWF)  
  it(`${escenario}/OWF/InputMaxValuesAllowed`, function () {
    for (let index = 0; index < Utils.getIterations(); index++) {
      let fullName = faker.lorem.words(2);
      let email = faker.internet.email();
      let labels = faker.lorem.words(2);
      let note = faker.lorem.paragraphs(50);
      let data = {
        fullName: Utils.completeString(fullName, Utils.removeSpacesString(faker.lorem.paragraphs(50)), 191, 'end'),
        email: Utils.completeString(email, Utils.removeSpacesString(faker.lorem.paragraphs(50)), 60, 'start'),
        labels: Utils.completeString(labels, Utils.removeSpacesString(faker.lorem.paragraphs(50)), 191, 'start'),
        note: Utils.sliceString(note, 500)
      }
      createMemberWithMaxValuesAllowed(data, `${escenario}/OWF/InputMaxValuesAllowed`);
    }
  })

  // Test scenario where you try to create a member sending higher values (OWF) 
  it(`${escenario}/OWF/HigherValues`, function () {
    for (let index = 0; index < Utils.getIterations(); index++) {
      let fullName = faker.lorem.words(2);
      let email = faker.internet.email();
      let labels = faker.lorem.words(2);
      let note = faker.lorem.paragraphs(50);
      let data = {
        fullName: Utils.completeString(fullName, Utils.removeSpacesString(faker.lorem.paragraphs(50)), 192, 'end'),
        email: Utils.completeString(email, Utils.removeSpacesString(faker.lorem.paragraphs(50)), 192, 'start'),
        labels: Utils.completeString(labels, Utils.removeSpacesString(faker.lorem.paragraphs(50)), 192, 'start'),
        note: Utils.sliceString(note, 501)
      }
      createMemberWithHigherValues(data, `${escenario}/OWF/HigherValues`);
    }
  })

})

function createMemberBase(data, escenarioToExecute) {
  login.login(url, emailLogin, passwordLogin, escenarioToExecute);
  cy.url().should("be.equal", dashboardPage);
  member.createMember(data.fullName, data.email, data.labels,
    data.note, emailLogin, escenarioToExecute);
  cy.url().should("be.equal", memberPage);
}

function createMemberSuccess(data, escenarioToExecute) {
  Utils.pruebaID_reset();
  createMemberBase(data, escenarioToExecute);
  member.listMembers().should("contain", data.fullName);
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  member.signout();
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  cy.url().should("be.equal", loginPage);
}


function createMemberWithEmptyValues(data, escenarioToExecute) {
  Utils.pruebaID_reset();
  createMemberBase(data, escenarioToExecute);
  member.getStayBtn().click();
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  member.getDivsResponseError().should("contain", 'Please enter an email.');
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  member.signout();
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  member.getLeaveBtn().click();
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  cy.url().should("be.equal", loginPage);
}

function createMemberWithHigherValues(data, escenarioToExecute) {
  Utils.pruebaID_reset();
  createMemberBase(data, escenarioToExecute);
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  member.getStayBtn().click();
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  member.getDivsResponseError().should("contain", 'Email');
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  member.signout();
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  member.getLeaveBtn().click();
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  cy.url().should("be.equal", loginPage);
}

function createMemberWithMinValuesAllowed(data, escenarioToExecute) {
  Utils.pruebaID_reset();
  createMemberBase(data, escenarioToExecute);
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  member.listMembers().should("contain", data.fullName);
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  member.signout();
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  cy.url().should("be.equal", loginPage);
}

function createMemberWithMaxValuesAllowed(data, escenarioToExecute) {
  Utils.pruebaID_reset();
  createMemberBase(data, escenarioToExecute);
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  member.listMembers().should("contain", data.fullName);
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  member.signout();
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  cy.url().should("be.equal", loginPage);
}

function createMemberWithDifferentTypes(data, escenarioToExecute) {
  Utils.pruebaID_reset();
  createMemberBase(data, escenarioToExecute);
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  member.getStayBtn().click();
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  member.getDivsResponseError().should("contain", 'Invalid Email');
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  member.signout();
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  member.getLeaveBtn().click();
  Utils.delay();
  Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
  cy.url().should("be.equal", loginPage);
}
