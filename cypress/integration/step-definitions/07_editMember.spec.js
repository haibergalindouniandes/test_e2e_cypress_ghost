//Imports libraries
const faker = require("faker");
const { Mockaroo } = require('../../data-generators/mockaroo');
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
const escenario1 = "07_edit_member/Valid_email";
const escenario2 = "07_edit_member/Invalid_email";
const escenario3 = "07_edit_member/Null_email";
const escenario4 = "07_edit_member/Name_naughty_string";
const escenario5 = "07_edit_member/Null_name";
const escenario6 = "07_edit_member/Note_naughty_string";
const escenario7 = "07_edit_member/Note_greater_500_characters";


//Test using Random DataPool with faker (RDP)
describe('Edit Member with faker - random DataPool', () => {
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

  it(escenario3, () => {
    const login = new Login();
    const member = new Member();        
    login.login(url, emailLogin, passwordLogin, escenario3);
    for(let i = 0; i < Utils.getIterations(); i++) {
      const name = faker.name.firstName();
      const emailAdrress = "";
      const label = faker.lorem.word(5);
      const notes = faker.lorem.word(5);
      member.editMember(name, emailAdrress, label, notes, emailLogin, escenario3); 
    };
  })

  it(escenario4, () => {
    const login = new Login();
    const member = new Member();        
    login.login(url, emailLogin, passwordLogin, escenario4);
    for(let i = 0; i < Utils.getIterations(); i++) {
      const name = faker.datatype.string(10);
      const emailAdrress = faker.internet.email();
      const label = faker.lorem.word(5);
      const notes = faker.lorem.word(5);
      member.editMember(name, emailAdrress, label, notes, emailLogin, escenario4);    
    };
  })

  it(escenario5, () => {
    const login = new Login();
    const member = new Member();        
    login.login(url, emailLogin, passwordLogin, escenario5);
    for(let i = 0; i < Utils.getIterations(); i++) {
      const name = "";
      const emailAdrress = faker.internet.email();
      const label = faker.lorem.word(5);
      const notes = faker.lorem.word(5);
      member.editMember(name, emailAdrress, label, notes, emailLogin, escenario5);      
    };
  })

  it(escenario6, () => {
    const login = new Login();
    const member = new Member();        
    login.login(url, emailLogin, passwordLogin, escenario6);
    for(let i = 0; i < Utils.getIterations(); i++) {
      const name = faker.datatype.string(10);
      const emailAdrress = faker.internet.email();
      const label = faker.lorem.word(5);
      const notes = faker.datatype.string(20);
      member.editMember(name, emailAdrress, label, notes, emailLogin, escenario6);    
    };
  })

  it(escenario7, () => {
    const login = new Login();
    const member = new Member();        
    login.login(url, emailLogin, passwordLogin, escenario7);
    for(let i = 0; i < Utils.getIterations(); i++) {
      const name = faker.datatype.string(10);
      const emailAdrress = faker.internet.email();
      const label = faker.lorem.word(5);
      const notes = faker.lorem.paragraph(40);
      member.editMember(name, emailAdrress, label, notes, emailLogin, escenario7);    
    };
  })

})


//Test using Dynamic DataPool with mokaroo (DDP)
describe('Edit Member with mockaroo - dynamic DataPool', () => {
  beforeEach(async function () {
    const mockaroo = new Mockaroo();
    const dataAccounts = await mockaroo.getData(Utils.getEndPointMockarooAccounts(), Utils.getApikeyMockarooAccounts());
    this.accountData = dataAccounts;
  })

  it(escenario1, function () {
    const login = new Login();
    const member = new Member();
    Utils.pruebaID_reset();
    login.login(url, emailLogin, passwordLogin, escenario1);    
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountData[i];
      cy.log(memberToCreate);           
      member.editMember(memberToCreate.full_name, memberToCreate.email, memberToCreate.labels, Utils.sliceString(memberToCreate.note, 50), 
                       emailLogin, escenario1); 
    };
  }) 

  it(escenario2, function () {
    const login = new Login();
    const member = new Member();        
    login.login(url, emailLogin, passwordLogin, escenario2);
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountData[i];
      cy.log(memberToCreate);           
      member.editMember(memberToCreate.full_name, memberToCreate.first_name, memberToCreate.labels, Utils.sliceString(memberToCreate.note, 50), 
                       emailLogin, escenario2);      
    };
  })

  it(escenario3, function () {
    const login = new Login();
    const member = new Member();        
    login.login(url, emailLogin, passwordLogin, escenario3);
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountData[i];
      cy.log(memberToCreate);           
      member.editMember(memberToCreate.full_name, "", memberToCreate.labels, Utils.sliceString(memberToCreate.note, 50), 
                       emailLogin, escenario3);      
    };
  })

  it(escenario4, function () {
    const login = new Login();
    const member = new Member();        
    login.login(url, emailLogin, passwordLogin, escenario4);
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountData[i];
      cy.log(memberToCreate);           
      member.editMember(memberToCreate.naughty_string, memberToCreate.email, memberToCreate.labels, Utils.sliceString(memberToCreate.note, 50), 
                       emailLogin, escenario4);      
    };
  })  
  
  it(escenario5, function () {
    const login = new Login();
    const member = new Member();        
    login.login(url, emailLogin, passwordLogin, escenario5);
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountData[i];
      cy.log(memberToCreate);           
      member.editMember("", memberToCreate.email, memberToCreate.labels, Utils.sliceString(memberToCreate.note, 50), 
                       emailLogin, escenario5);      
    };
  })

  it(escenario6, function () {
    const login = new Login();
    const member = new Member();        
    login.login(url, emailLogin, passwordLogin, escenario6);
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountData[i];
      cy.log(memberToCreate);           
      member.editMember(memberToCreate.full_name, memberToCreate.email, memberToCreate.labels, memberToCreate.naughty_string, 
                       emailLogin, escenario6);      
    };
  })
  
  it(escenario7, function () {
    const login = new Login();
    const member = new Member();        
    login.login(url, emailLogin, passwordLogin, escenario7);
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountData[i];
      cy.log(memberToCreate);           
      member.editMember(memberToCreate.full_name, memberToCreate.email, memberToCreate.labels, Utils.sliceString(memberToCreate.string_large, 600), 
                       emailLogin, escenario7);      
    };
  })

})


// Test using a priori data pool with mokaroo (APDP)
describe('Edit Member with mockaroo - a priori DataPool', function() {
  beforeEach(function () {    
    cy.fixture('Accounts.json').then(function (accountDataFixture) {
      this.accountDataFixture = accountDataFixture;      
    })
  })
    
  it(escenario1, function () {     
    cy.log(this.accountDataFixture);
    const login = new Login();
    const member = new Member();
    Utils.pruebaID_reset();
    login.login(url, emailLogin, passwordLogin, escenario1);    
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountDataFixture[i];
      cy.log(memberToCreate);           
      member.editMember(memberToCreate.full_name, memberToCreate.email, memberToCreate.labels, Utils.sliceString(memberToCreate.note, 50), 
                       emailLogin, escenario1); 
    };    
  })
  
  it(escenario2, function () {
    cy.log(this.accountDataFixture)
    const login = new Login();
    const member = new Member();        
    login.login(url, emailLogin, passwordLogin, escenario2);
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountDataFixture[i];
      cy.log(memberToCreate);           
      member.editMember(memberToCreate.full_name, memberToCreate.first_name, memberToCreate.labels, Utils.sliceString(memberToCreate.note, 50), 
                       emailLogin, escenario2);      
    };
  })

  it(escenario3, function () {
    cy.log(this.accountDataFixture)
    const login = new Login();
    const member = new Member();        
    login.login(url, emailLogin, passwordLogin, escenario3);
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountDataFixture[i];
      cy.log(memberToCreate);           
      member.editMember(memberToCreate.full_name, "", memberToCreate.labels, Utils.sliceString(memberToCreate.note, 50), 
                       emailLogin, escenario3);      
    };
  })

  it(escenario4, function () {
    cy.log(this.accountDataFixture)
    const login = new Login();
    const member = new Member();        
    login.login(url, emailLogin, passwordLogin, escenario4);
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountDataFixture[i];
      cy.log(memberToCreate);           
      member.editMember(memberToCreate.naughty_string, memberToCreate.email, memberToCreate.labels, Utils.sliceString(memberToCreate.note, 50), 
                       emailLogin, escenario4);      
    };
  })  
  
  it(escenario5, function () {
    cy.log(this.accountDataFixture)
    const login = new Login();
    const member = new Member();        
    login.login(url, emailLogin, passwordLogin, escenario5);
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountDataFixture[i];
      cy.log(memberToCreate);           
      member.editMember("", memberToCreate.email, memberToCreate.labels, Utils.sliceString(memberToCreate.note, 50), 
                       emailLogin, escenario5);      
    };
  })

  it(escenario6, function () {
    cy.log(this.accountDataFixture)
    const login = new Login();
    const member = new Member();        
    login.login(url, emailLogin, passwordLogin, escenario6);
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountDataFixture[i];
      cy.log(memberToCreate);           
      member.editMember(memberToCreate.full_name, memberToCreate.email, memberToCreate.labels, memberToCreate.naughty_string, 
                       emailLogin, escenario6);      
    };
  })
  
  it(escenario7, function () {
    cy.log(this.accountDataFixture)
    const login = new Login();
    const member = new Member();        
    login.login(url, emailLogin, passwordLogin, escenario7);
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountDataFixture[i];
      cy.log(memberToCreate);           
      member.editMember(memberToCreate.full_name, memberToCreate.email, memberToCreate.labels, Utils.sliceString(memberToCreate.string_large, 600), 
                       emailLogin, escenario7);      
    };
  })

})



