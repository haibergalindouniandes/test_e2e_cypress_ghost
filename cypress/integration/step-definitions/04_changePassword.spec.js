//Imports libraries
const faker = require("faker");
const { Mockaroo } = require('../../data-generators/mockaroo');
import { Utils } from '../../support/utils';
import Login from "../PageObjects/login";
import Staff from "../PageObjects/staff";

//Modifiable Test Variables
//Constant that allows defining the url of the web application to test

const url = Utils.getUrl();
const dashboardPage = Utils.getDashboardPage();
const memberPage = Utils.getMemberPage();
const staffPage = Utils.getStaffPage();
const emailLogin = Utils.getEmail();
const passwordLogin = Utils.getPassword();
const newPassword = Utils.getNewPassword(); 
const escenario1 = "20_change_password/Correct_oldPassword";
const escenario2 = "20_change_password/Wrong_oldPassword";
const escenario3 = "20_change_password/Null_newPassword";
const escenario4 = "20_change_password/Wrong_VerificationPassword";


//Test using Random DataPool with faker (RDP)
describe('Edit Member with faker - random DataPool', () => {
  it(escenario1, () => {
    const login = new Login();
    const staff = new Staff();
    Utils.pruebaID_reset();
    login.login(url, emailLogin, passwordLogin, escenario1);
    for(let i = 0; i < Utils.getIterations(); i++) {      
      staff.changePassword(passwordLogin, newPassword, newPassword, emailLogin, escenario1); 
    };
  })
    
  it(escenario2, () => {
    const login = new Login();
    const staff = new Staff();        
    login.login(url, emailLogin, passwordLogin, escenario2);
    for(let i = 0; i < Utils.getIterations(); i++) {
      const oldPassword = faker.internet.password(20);
      const newPasswordFaker = faker.internet.password(20);
      staff.changePassword(oldPassword, newPasswordFaker, newPasswordFaker, emailLogin, escenario2);      
    };
  })

  it(escenario3, () => {
    const login = new Login();
    const staff = new Staff();      
    login.login(url, emailLogin, passwordLogin, escenario3);
    for(let i = 0; i < Utils.getIterations(); i++) {      
      const newpasswordNull = "";
      staff.changePassword(passwordLogin, newpasswordNull, newpasswordNull, emailLogin, escenario3); 
    };
  })

  it(escenario4, () => {
    const login = new Login();
    const staff = new Staff();        
    login.login(url, emailLogin, passwordLogin, escenario4);
    for(let i = 0; i < Utils.getIterations(); i++) {
      const VerificationPassword = faker.internet.password(20);
      staff.changePassword(passwordLogin, newPassword, VerificationPassword, emailLogin, escenario4);    
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
    const staff = new Staff();
    Utils.pruebaID_reset();
    login.login(url, emailLogin, passwordLogin, escenario1);    
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountData[i];
      cy.log(memberToCreate);           
      staff.changePassword(passwordLogin, newPassword, newPassword, emailLogin, escenario1); 
    };
  }) 

  it(escenario2, function () {
    const login = new Login();
    const staff = new Staff();        
    login.login(url, emailLogin, passwordLogin, escenario2);
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountData[i];
      cy.log(memberToCreate);
      const oldPassword = memberToCreate.password;
      const newPassworAPI = memberToCreate.new_password;               
      staff.changePassword(oldPassword, newPassworAPI, newPassworAPI, emailLogin, escenario2);      
    };
  })

  it(escenario3, function () {
    const login = new Login();
    const staff = new Staff();        
    login.login(url, emailLogin, passwordLogin, escenario3);
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountData[i];
      cy.log(memberToCreate);
      const newpasswordNull = "";         
      staff.changePassword(passwordLogin, newpasswordNull, newpasswordNull, emailLogin, escenario3);      
    };
  })

  it(escenario4, function () {
    const login = new Login();
    const staff = new Staff();        
    login.login(url, emailLogin, passwordLogin, escenario4);
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountData[i];
      cy.log(memberToCreate);
      const VerificationPassword = memberToCreate.new_password;               
      staff.changePassword(passwordLogin, newPassword, VerificationPassword, emailLogin, escenario4);      
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
    const staff = new Staff();
    Utils.pruebaID_reset();
    login.login(url, emailLogin, passwordLogin, escenario1);    
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountDataFixture[i];
      cy.log(memberToCreate);           
      staff.changePassword(passwordLogin, newPassword, newPassword, emailLogin, escenario1); 
    };    
  })
  
  it(escenario2, function () {
    cy.log(this.accountDataFixture)
    const login = new Login();
    const staff = new Staff();        
    login.login(url, emailLogin, passwordLogin, escenario2);
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountDataFixture[i];
      cy.log(memberToCreate);           
      const oldPassword = memberToCreate.password;
      const newPassworJSON = memberToCreate.new_password;               
      staff.changePassword(oldPassword, newPassworJSON, newPassworJSON, emailLogin, escenario2);      
    };
  })

  it(escenario3, function () {
    cy.log(this.accountDataFixture)
    const login = new Login();
    const staff = new Staff();        
    login.login(url, emailLogin, passwordLogin, escenario3);
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountDataFixture[i];
      cy.log(memberToCreate);           
      const newpasswordNull = "";         
      staff.changePassword(passwordLogin, newpasswordNull, newpasswordNull, emailLogin, escenario3);      
    };
  })

  it(escenario4, function () {
    cy.log(this.accountDataFixture)
    const login = new Login();
    const staff = new Staff();        
    login.login(url, emailLogin, passwordLogin, escenario4);
    for(let i = 0; i < Utils.getIterations(); i++) {
      let memberToCreate = this.accountDataFixture[i];
      cy.log(memberToCreate);           
      const VerificationPassword = memberToCreate.new_password;               
      staff.changePassword(passwordLogin, newPassword, VerificationPassword, emailLogin, escenario4);      
    };
  })   
 
})

