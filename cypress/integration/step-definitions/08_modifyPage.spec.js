const faker = require("faker");
const { Mockaroo } = require('../../data-generators/mockaroo');
import Login from "../PageObjects/login";
import Pages from "../PageObjects/pages";
import { Utils } from '../../support/utils';


//Modifiable Test Variables
//Constant that allows defining the url of the web application to test

const url = Utils.getUrl();
const dashboardPage = Utils.getDashboardPage();
const emailLogin = Utils.getEmail();
const passwordLogin = Utils.getPassword();
const escenario = "13_modify_page";

describe('Modify Page with Data Pool A Priori(DPAP)', () => {
    beforeEach(function () {
        cy.fixture('schemaCreatePage.json').then(function (pagesData) {
          this.pagesData = pagesData;
        })
      })

    it(`${escenario}_DPAP_SuccessData`, function() {     
        const pages = new Pages();        
        const login = new Login();  
        Utils.pruebaID_reset();              
        login.login(url, emailLogin, passwordLogin, escenario); 
        cy.url().should("be.equal", dashboardPage);    
        let pageToCreate = this.pagesData[Utils.getRandomInt(0, this.pagesData.length - 1)];
        cy.log(pageToCreate);    
        pages.modifyPage(emailLogin, pageToCreate.page_title, pageToCreate.page_content, escenario);
    })  

    it(`${escenario}_DPAP_Failed_Null_Title`, function() {     
        const pages = new Pages();        
        const login = new Login();  
        Utils.pruebaID_reset();              
        login.login(url, emailLogin, passwordLogin, escenario); 
        cy.url().should("be.equal", dashboardPage);    
        let pageToCreate = this.pagesData[Utils.getRandomInt(0, this.pagesData.length - 1)];
        cy.log(pageToCreate);    
        pages.modifyPage(emailLogin, "", pageToCreate.page_content, escenario);
    })  

    it(`${escenario}_DPAP_Failed_Null_Content`, function() {     
        const pages = new Pages();        
        const login = new Login();  
        Utils.pruebaID_reset();              
        login.login(url, emailLogin, passwordLogin, escenario); 
        cy.url().should("be.equal", dashboardPage);    
        let pageToCreate = this.pagesData[Utils.getRandomInt(0, this.pagesData.length - 1)];
        cy.log(pageToCreate);    
        pages.modifyPage(emailLogin, pageToCreate.page_title, "", escenario);
    })  

    it(`${escenario}_DPAP_length_Title`, function() {     
        const pages = new Pages();        
        const login = new Login();  
        Utils.pruebaID_reset();              
        login.login(url, emailLogin, passwordLogin, escenario); 
        cy.url().should("be.equal", dashboardPage);    
        let pageToCreate = this.pagesData[Utils.getRandomInt(0, this.pagesData.length - 1)];
        cy.log(pageToCreate);    
        pages.modifyPage(emailLogin, pageToCreate.page_title+pageToCreate.page_content, pageToCreate.page_content2, escenario);
    })  

    it(`${escenario}_DPAP_special_characters`, function() {     
        const pages = new Pages();        
        const login = new Login();  
        Utils.pruebaID_reset();              
        login.login(url, emailLogin, passwordLogin, escenario); 
        cy.url().should("be.equal", dashboardPage);    
        let pageToCreate = this.pagesData[Utils.getRandomInt(0, this.pagesData.length - 1)];
        cy.log(pageToCreate);    
        pages.modifyPage(emailLogin, pageToCreate.special_chararters+pageToCreate.page_title, pageToCreate.special_chararters+pageToCreate.page_content+pageToCreate.page_content2, escenario);
    })  
   
})

describe('Create Page With Dynamic DataPool(DDP)', () => {
    beforeEach(async function () {
      const mockaroo = new Mockaroo();
      const dataAccounts = await mockaroo.getData(Utils.getEndPointMockarooPages(), Utils.getApikeyMockarooPages());
      this.pagesData = dataAccounts;
    })
  
    it(`${escenario}_DDP_SuccessData`, function() {     
        const pages = new Pages();        
        const login = new Login();  
        Utils.pruebaID_reset();              
        login.login(url, emailLogin, passwordLogin, escenario); 
        cy.url().should("be.equal", dashboardPage);    
        let pageToCreate = this.pagesData[Utils.getRandomInt(0, this.pagesData.length - 1)];
        cy.log(pageToCreate);    
        pages.modifyPage(emailLogin, pageToCreate.page_title, pageToCreate.page_content, escenario);
    })

    // Test scenario successful creation of a member (DDP)
    it(`${escenario}_DDP_Failed_Null_Title`, function () {
      const login = new Login();
      const pages = new Pages();
      Utils.pruebaID_reset();
      login.login(url, emailLogin, passwordLogin, escenario);
      cy.url().should("be.equal", dashboardPage);
      let pageToCreate = this.pagesData[Utils.getRandomInt(0, this.pagesData.length - 1)];
      cy.log(pageToCreate);    
      pages.modifyPage(emailLogin, "", pageToCreate.page_content, escenario);
    })

    it(`${escenario}_DDP_Failed_Null_Content`, function() {     
        const pages = new Pages();        
        const login = new Login();  
        Utils.pruebaID_reset();              
        login.login(url, emailLogin, passwordLogin, escenario); 
        cy.url().should("be.equal", dashboardPage);    
        let pageToCreate = this.pagesData[Utils.getRandomInt(0, this.pagesData.length - 1)];
        cy.log(pageToCreate);    
        pages.modifyPage(emailLogin, pageToCreate.page_title, "", escenario);
    })  

    it(`${escenario}_DDP_length_Title`, function() {     
        const pages = new Pages();        
        const login = new Login();  
        Utils.pruebaID_reset();              
        login.login(url, emailLogin, passwordLogin, escenario); 
        cy.url().should("be.equal", dashboardPage);    
        let pageToCreate = this.pagesData[Utils.getRandomInt(0, this.pagesData.length - 1)];
        cy.log(pageToCreate);    
        pages.modifyPage(emailLogin, pageToCreate.page_title+pageToCreate.page_content, pageToCreate.page_content, escenario);
    })  

    it(`${escenario}_DDP_special_characters`, function() {     
        const pages = new Pages();        
        const login = new Login();  
        Utils.pruebaID_reset();              
        login.login(url, emailLogin, passwordLogin, escenario); 
        cy.url().should("be.equal", dashboardPage);    
        let pageToCreate = this.pagesData[Utils.getRandomInt(0, this.pagesData.length - 1)];
        cy.log(pageToCreate);    
        pages.modifyPage(emailLogin, pageToCreate.special_chararters+pageToCreate.page_title, pageToCreate.special_chararters+pageToCreate.page_content+pageToCreate.page_content2, escenario);
    })
})

//Test using data online with Faker (OFD)
describe('Create Page With FakerData(OFD)', () => {

    it(`${escenario}_OFD_SuccessData`, function() {     
        const pages = new Pages();        
        const login = new Login();  
        Utils.pruebaID_reset();              
        login.login(url, emailLogin, passwordLogin, escenario); 
        cy.url().should("be.equal", dashboardPage);    
        let title = faker.company.companySuffix()+" - "+faker.company.name() +" - "+faker.commerce.productDescription();
        let content = faker.random.words(30);
        pages.modifyPage(emailLogin, title, content, escenario);
    })

    // Test scenario successful creation of a member (OFD)
    it(`${escenario}_OFD_Failed_Null_Title`, function () {
      const login = new Login();
      const pages = new Pages();
      let fullName = faker.name.firstName().concat(" ", faker.name.lastName());
      Utils.pruebaID_reset();
      login.login(url, emailLogin, passwordLogin, escenario);
      cy.url().should("be.equal", dashboardPage);
      let title = "";
      let content = faker.random.words(30);
      pages.modifyPage(emailLogin, title, content, escenario);
    })

    it(`${escenario}_OFD_Failed_Null_Content`, function () {
        const login = new Login();
        const pages = new Pages();
        let fullName = faker.name.firstName().concat(" ", faker.name.lastName());
        Utils.pruebaID_reset();
        login.login(url, emailLogin, passwordLogin, escenario);
        cy.url().should("be.equal", dashboardPage);
        let title = faker.random.words(10);
        let content = "";
        pages.modifyPage(emailLogin, title, content, escenario);
    })

    it(`${escenario}_OFD_length_Title`, function () {
        const login = new Login();
        const pages = new Pages();
        let fullName = faker.name.firstName().concat(" ", faker.name.lastName());
        Utils.pruebaID_reset();
        login.login(url, emailLogin, passwordLogin, escenario);
        cy.url().should("be.equal", dashboardPage);
        let title = faker.random.words(30);
        let content = faker.random.words(50);
        pages.modifyPage(emailLogin, title, content, escenario);
    })

    it(`${escenario}_OFD_special_characters`, function() {     
        const pages = new Pages();        
        const login = new Login();  
        Utils.pruebaID_reset();              
        login.login(url, emailLogin, passwordLogin, escenario); 
        cy.url().should("be.equal", dashboardPage);    
        let title = faker.random.words(20);
        let content = faker.random.words(50);
        pages.modifyPage(emailLogin, title, content, escenario);
    })

})