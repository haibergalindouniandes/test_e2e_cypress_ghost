//Imports libreries
const faker = require("faker");
const { Mockaroo } = require('../../data-generators/mockaroo');
import Member from "../PageObjects/member";
import { Utils } from '../../support/utils';
import Login from "../PageObjects/login";
import Staff from "../PageObjects/staff";
//Modifiable Test Variables
//Constant that allows defining the url of the web application to test
const login = new Login();
const staff = new Staff();
const member = new Member();
const mockaroo = new Mockaroo();
const loginPage = Utils.getUrl();
const url = Utils.getUrl();
const dashboardPage = Utils.getDashboardPage();
const staffPage = Utils.getStaffPage();
const emailLogin = Utils.getEmail();
const passwordLogin = Utils.getPassword();
const escenario = "11_invite_people";

//////////////////////////// Test using dinamic data pool (DDP)
describe('Invite People With Dynamic DataPool', () => {
    beforeEach(async function () {
        const dataAccounts = await mockaroo.getData(Utils.getEndPointMockarooAccounts(), Utils.getApikeyMockarooAccounts());
        this.accountData = dataAccounts;
    })

    // Test scenario successful send a invitation (DDP)
    it(`${escenario}/DDP/SuccessData`, function () {
        for (let index = 0; index < Utils.getIterations(); index++) {
            let memberToCreate = this.accountData[Utils.getRandomInt(0, this.accountData.length - 1)];
            let data = {
                fullName: memberToCreate.full_name, email: memberToCreate.email, labels: memberToCreate.labels,
                note: Utils.sliceString(memberToCreate.note, 200)
            }
            invitePeopleSuccess(data, `${escenario}/DDP/SuccessData`);
        }
    })

    // Test scenario where you try to send invitation with an empty name and empty email (DDP)
    it(`${escenario}/DDP/EmptyValues`, function () {
        for (let index = 0; index < Utils.getIterations(); index++) {
            let memberToCreate = this.accountData[Utils.getRandomInt(0, this.accountData.length - 1)];
            let data = {
                fullName: '', email: '', labels: memberToCreate.labels,
                note: Utils.sliceString(memberToCreate.note, 200)
            }
            invitePeopleWithEmptyValues(data, `${escenario}/DDP/EmptyValues`);
        }
    })

    // Test scenario where you try to send invitation by sending different types of data to those requested (DDP)  
    it(`${escenario}/DDP/InputValuesDifferentTypes`, function () {
        for (let index = 0; index < Utils.getIterations(); index++) {
            let memberToCreate = this.accountData[Utils.getRandomInt(0, this.accountData.length - 1)];
            let data = {
                fullName: memberToCreate.naughty_string, email: memberToCreate.naughty_string, labels: memberToCreate.naughty_string,
                note: Utils.sliceString(memberToCreate.note, 200)
            }
            invitePeopleWithDifferentTypes(data, `${escenario}/DDP/InputValuesDifferentTypes`);
        }
    })

    // Test scenario where you try to send invitation sending min values than allowed (DDP)  
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
            invitePeopleWithMinValuesAllowed(data, `${escenario}/DDP/InputMinValuesAllowed`);
        }
    })

    // Test scenario where you try to send invitation sending min values than allowed (DDP)  
    it(`${escenario}/DDP/InputMaxValuesAllowed`, function () {
        for (let index = 0; index < Utils.getIterations(); index++) {
            let memberToCreate = this.accountData[Utils.getRandomInt(0, this.accountData.length - 1)];
            let data = {
                fullName: Utils.completeString(memberToCreate.full_name, Utils.removeSpacesString(memberToCreate.string_large), 191, 'end'),
                email: Utils.completeString(memberToCreate.email, Utils.removeSpacesString(memberToCreate.string_large), 60, 'start'),
                labels: Utils.completeString(memberToCreate.labels, Utils.removeSpacesString(memberToCreate.string_large), 191, 'start'),
                note: Utils.sliceString(memberToCreate.note, 500)
            }
            invitePeopleWithMaxValuesAllowed(data, `${escenario}/DDP/InputMaxValuesAllowed`);
        }
    })

    // Test scenario where you try to send invitation sending higher values (DDP) 
    it(`${escenario}/DDP/HigherValues`, function () {
        for (let index = 0; index < Utils.getIterations(); index++) {
            let memberToCreate = this.accountData[Utils.getRandomInt(0, this.accountData.length - 1)];
            let data = {
                fullName: Utils.completeString(memberToCreate.full_name, memberToCreate.string_large, 192, 'end'),
                email: Utils.completeString(memberToCreate.email, memberToCreate.string_large, 192, 'start'),
                labels: memberToCreate.labels,
                note: Utils.sliceString(memberToCreate.string_large, 501)
            }
            invitePeopleWithHigherValues(data, `${escenario}/DDP/HigherValues`);
        }
    })
})

//////////////////////////// Test using data pool a priori (DPAP)
describe('Invite People With DataPool A Priori', () => {
    beforeEach(function () {
        cy.fixture('Accounts.json').then(function (accountDataFixture) {
            this.accountDataFixture = accountDataFixture;
        })
    })
    // Test scenario successful send a invitation (DPAP)
    it(`${escenario}/DPAP/SuccessData`, function () {
        for (let index = 0; index < Utils.getIterations(); index++) {
            let memberToCreate = this.accountDataFixture[Utils.getRandomInt(0, this.accountDataFixture.length - 1)];
            let data = {
                fullName: memberToCreate.full_name, email: memberToCreate.email, labels: memberToCreate.labels,
                note: Utils.sliceString(memberToCreate.note, 499)
            }
            invitePeopleSuccess(data, `${escenario}/DPAP/SuccessData`);
        }
    })

    // Test scenario where you try to send invitation with an empty name and empty email (DPAP)
    it(`${escenario}/DPAP/EmptyValues`, function () {
        for (let index = 0; index < Utils.getIterations(); index++) {
            let memberToCreate = this.accountDataFixture[Utils.getRandomInt(0, this.accountDataFixture.length - 1)];
            let data = {
                fullName: '', email: '', labels: memberToCreate.labels,
                note: Utils.sliceString(memberToCreate.note, 200)
            }
            invitePeopleWithEmptyValues(data, `${escenario}/DPAP/EmptyValues`);
        }
    })

    // Test scenario where you try to send invitation by sending different types of data to those requested (DPAP)  
    it(`${escenario}/DPAP/InputValuesDifferentTypes`, function () {
        for (let index = 0; index < Utils.getIterations(); index++) {
            let memberToCreate = this.accountDataFixture[Utils.getRandomInt(0, this.accountDataFixture.length - 1)];
            let data = {
                fullName: memberToCreate.naughty_string, email: memberToCreate.naughty_string, labels: memberToCreate.naughty_string,
                note: Utils.sliceString(memberToCreate.note, 200)
            }
            invitePeopleWithDifferentTypes(data, `${escenario}/DPAP/InputValuesDifferentTypes`);
        }
    })

    // Test scenario where you try to send invitation sending min values than allowed (DPAP)  
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
            invitePeopleWithMinValuesAllowed(data, `${escenario}/DPAP/InputMinValuesAllowed`);
        }
    })

    // Test scenario where you try to send invitation sending min values than allowed (DPAP)  
    it(`${escenario}/DPAP/InputMaxValuesAllowed`, function () {
        for (let index = 0; index < Utils.getIterations(); index++) {
            let memberToCreate = this.accountDataFixture[Utils.getRandomInt(0, this.accountDataFixture.length - 1)];
            let data = {
                fullName: Utils.completeString(memberToCreate.full_name, Utils.removeSpacesString(memberToCreate.string_large), 191, 'end'),
                email: Utils.completeString(memberToCreate.email, Utils.removeSpacesString(memberToCreate.string_large), 60, 'start'),
                labels: Utils.completeString(memberToCreate.labels, Utils.removeSpacesString(memberToCreate.string_large), 191, 'start'),
                note: Utils.sliceString(memberToCreate.note, 500)
            }
            invitePeopleWithMaxValuesAllowed(data, `${escenario}/DPAP/InputMaxValuesAllowed`);
        }
    })

    // Test scenario where you try to send invitation sending higher values (DPAP) 
    it(`${escenario}/DPAP/HigherValues`, function () {
        for (let index = 0; index < Utils.getIterations(); index++) {
            let memberToCreate = this.accountDataFixture[Utils.getRandomInt(0, this.accountDataFixture.length - 1)];
            let data = {
                fullName: Utils.completeString(memberToCreate.full_name, memberToCreate.string_large, 192, 'end'),
                email: Utils.completeString(memberToCreate.email, memberToCreate.string_large, 192, 'start'),
                labels: memberToCreate.labels,
                note: Utils.sliceString(memberToCreate.string_large, 501)
            }
            invitePeopleWithHigherValues(data, `${escenario}/DPAP/HigherValues`);
        }
    })

})

//////////////////////////// Test using data online with Faker (OWF)
describe('Invite People With Faker', () => {
    // Test scenario successful send a invitation (OWF)
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
            invitePeopleSuccess(data, `${escenario}/OWF/SuccessData`);
        }
    })

    // Test scenario where you try to send invitation with an empty name and empty email (OWF)
    it(`${escenario}/OWF/EmptyValues`, function () {
        for (let index = 0; index < Utils.getIterations(); index++) {
            let labels = faker.lorem.words(2);
            let note = faker.lorem.paragraphs(50);
            let data = {
                fullName: '', email: '', labels: labels,
                note: Utils.sliceString(note, 200)
            }
            invitePeopleWithEmptyValues(data, `${escenario}/OWF/EmptyValues`);
        }
    })

    // Test scenario where you try to send invitation by sending different types of data to those requested (OWF)  
    it(`${escenario}/OWF/InputValuesDifferentTypes`, function () {
        for (let index = 0; index < Utils.getIterations(); index++) {
            let fullName = faker.datatype.string(50);
            let email = faker.datatype.string(50);
            let labels = faker.random.number({ min: 1000000000, max: 9999000000 });
            let note = faker.random.number({ min: 1000000000, max: 9999000000 });
            let data = {
                fullName: fullName, email: email, labels: labels,
                note: note
            }
            invitePeopleWithDifferentTypes(data, `${escenario}/OWF/InputValuesDifferentTypes`);
        }
    })

    // Test scenario where you try to send invitation sending min values than allowed (OWF)  
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
            invitePeopleWithMinValuesAllowed(data, `${escenario}/OWF/InputMinValuesAllowed`);
        }
    })

    // Test scenario where you try to send invitation sending min values than allowed (OWF)  
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
            invitePeopleWithMaxValuesAllowed(data, `${escenario}/OWF/InputMaxValuesAllowed`);
        }
    })

    // Test scenario where you try to send invitation sending higher values (OWF) 
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
            invitePeopleWithHigherValues(data, `${escenario}/OWF/HigherValues`);
        }
    })

})

function invitePeopleBase(data, escenarioToExecute) {
    login.login(url, emailLogin, passwordLogin, escenarioToExecute);
    cy.url().should('be.equal', dashboardPage);
    staff.sendInvitation(data.email, emailLogin, escenarioToExecute);
    cy.url().should('be.equal', staffPage);
}

function invitePeopleSuccess(data, escenarioToExecute) {
    Utils.pruebaID_reset();
    invitePeopleBase(data, escenarioToExecute);
    cy.reload();
    Utils.delay();
    Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());
    Utils.delay();
    staff.listPeopleInvited().should('contain', data.email);
    Utils.delay();
    Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
    member.signout();
    Utils.delay();
    Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
    cy.url().should("be.equal", loginPage);
}

function invitePeopleWithEmptyValues(data, escenarioToExecute) {
    Utils.pruebaID_reset();
    invitePeopleBase(data, escenarioToExecute);
    Utils.delay()
    staff.getDivsResponseError().should("contain", 'Please enter an email');
    Utils.delay()
    Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
    staff.getDivClose().click();
    Utils.delay();
    Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
    member.signout();
    Utils.delay();
    Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
    cy.url().should("be.equal", loginPage);
}


function invitePeopleWithDifferentTypes(data, escenarioToExecute) {
    Utils.pruebaID_reset();
    invitePeopleBase(data, escenarioToExecute);
    Utils.delay()
    staff.getDivsResponseError().should("contain", 'Invalid Email');
    Utils.delay()
    Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
    staff.getDivClose().click();
    Utils.delay();
    Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
    member.signout();
    Utils.delay();
    Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
    cy.url().should("be.equal", loginPage);
}

function invitePeopleWithMinValuesAllowed(data, escenarioToExecute) {
    Utils.pruebaID_reset();
    invitePeopleBase(data, escenarioToExecute);
    cy.reload();
    Utils.delay();
    Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());
    Utils.delay();
    staff.listPeopleInvited().should('contain', data.email);
    Utils.delay();
    Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
    member.signout();
    Utils.delay();
    Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
    cy.url().should("be.equal", loginPage);
}

function invitePeopleWithMaxValuesAllowed(data, escenarioToExecute) {
    Utils.pruebaID_reset();
    invitePeopleBase(data, escenarioToExecute);
    cy.reload();
    Utils.delay();
    Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());
    Utils.delay();
    staff.listPeopleInvited().should('contain', data.email);
    Utils.delay();
    Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
    member.signout();
    Utils.delay();
    Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
    cy.url().should("be.equal", loginPage);
}

function invitePeopleWithHigherValues(data, escenarioToExecute) {
    Utils.pruebaID_reset();
    invitePeopleBase(data, escenarioToExecute);
    Utils.delay()
    staff.getDivsResponseError().should("contain", 'Invalid Email');
    Utils.delay()
    Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
    staff.getDivClose().click();
    Utils.delay();
    Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
    member.signout();
    Utils.delay();
    Utils.takeScreenshot(emailLogin, escenarioToExecute, "Paso_" + Utils.pruebaID());
    cy.url().should("be.equal", loginPage);
}