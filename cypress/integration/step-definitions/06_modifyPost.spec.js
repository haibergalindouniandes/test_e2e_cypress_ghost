const faker = require("faker");
const { Mockaroo } = require("../../data-generators/mockaroo");
import Login from "../PageObjects/login";
import Posts from "../PageObjects/posts";
import { Utils } from "../../support/utils";

//Modifiable Test Variables
//Constant that allows defining the url of the web application to test

const url = Utils.getUrl();
const emailLogin = Utils.getEmail();
const passwordLogin = Utils.getPassword();
const escenario = "14_update_post";
const typeResultSuccess = "success";
const typeResultError = "Error";

//Test using data pool a priori

//Test setup

describe("Update post DPAP", () => {
  beforeEach(function () {
    cy.fixture("Posts.json").then(function(dataPostFixture){
      this.postDataFixture = dataPostFixture;
    })
  });

  it(`${escenario}_DPAP_SuccessData`, function () {
    cy.log(this.postDataFixture);
    const login = new Login();
    const posts = new Posts();    
    Utils.pruebaID_reset();
    login.login(url, emailLogin, passwordLogin, escenario);
    for (let i = 0; i < Utils.getIterations(); i++) {
      cy.log("registro " + i);
      let postToCreate =
        this.postDataFixture[
          Utils.getRandomInt(0, this.postDataFixture.length - 1)
        ];
      cy.log(postToCreate);      
      const postContent = postToCreate.content;
      posts.updatePost(postContent, emailLogin, escenario,typeResultSuccess);
    }
  });

  it(`${escenario}_DPAP_New_Title`, function () {
    cy.log(this.postDataFixture);
    const login = new Login();
    const posts = new Posts();
    Utils.pruebaID_reset();
    login.login(url, emailLogin, passwordLogin, escenario);
    for (let i = 0; i < Utils.getIterations(); i++) {
      cy.log("registro " + i);
      let postToCreate =
        this.postDataFixture[
          Utils.getRandomInt(0, this.postDataFixture.length - 1)
        ];
      cy.log(postToCreate);      
      const postTitle = postToCreate.title;
      posts.updatePostTitle(postTitle, emailLogin, escenario,typeResultSuccess);
    }
  });


it(`${escenario}_DPAP_New_Content`, function () {
    cy.log(this.postDataFixture);
    const login = new Login();
    const posts = new Posts();    
    Utils.pruebaID_reset();
    login.login(url, emailLogin, passwordLogin, escenario);
    for (let i = 0; i < Utils.getIterations(); i++) {
      cy.log("registro " + i);
      let postToCreate =
        this.postDataFixture[
          Utils.getRandomInt(0, this.postDataFixture.length - 1)
        ];
      cy.log(postToCreate);      
      const postContent = postToCreate.content;
      posts.updatePostContent(postContent, emailLogin, escenario,typeResultSuccess);
    }
  });


  it(`${escenario}_DPAP_New_Url`, function () {
    cy.log(this.postDataFixture);
    const login = new Login();
    const posts = new Posts();    
    Utils.pruebaID_reset();
    login.login(url, emailLogin, passwordLogin, escenario);
    for (let i = 0; i < Utils.getIterations(); i++) {
      cy.log("registro " + i);
      let postToCreate =
        this.postDataFixture[
          Utils.getRandomInt(0, this.postDataFixture.length - 1)
        ];
      cy.log(postToCreate);      
      const postTitle = postToCreate.title;
      posts.updatePostUrl(postTitle, emailLogin, escenario,typeResultSuccess);
    }
  });


  it(`${escenario}_DPAP_Clear_Data`, function () {
    cy.log(this.postDataFixture);
    const login = new Login();
    const posts = new Posts();
    const postContent = faker.commerce.productDescription();
    Utils.pruebaID_reset();
    login.login(url, emailLogin, passwordLogin, escenario);
    for (let i = 0; i < Utils.getIterations(); i++) {
      cy.log("registro " + i);
      let postToCreate =
        this.postDataFixture[
          Utils.getRandomInt(0, this.postDataFixture.length - 1)
        ];
      cy.log(postToCreate);      
      const postTitle = postToCreate.title;
      const postContent = postToCreate.content;
      posts.updatePostClear(postTitle,postContent, emailLogin, escenario,typeResultSuccess);
    }
  });


});


/////////////////////////
//Dynamic DataPool

describe("Update post DDP", () => {
    beforeEach(async function () {
        const mockaroo = new Mockaroo();
        const dataPosts = await mockaroo.getData(Utils.getEndPointMockarooPosts(), Utils.getApikeyMockarooPost());
        this.postsData = dataPosts;
    });

    it(`${escenario}_DDP_SuccessData`, function () {
      cy.log(this.postsData);
      const login = new Login();
      const posts = new Posts();      
      Utils.pruebaID_reset();
      login.login(url, emailLogin, passwordLogin, escenario);
      for (let i = 0; i < Utils.getIterations(); i++) {
        cy.log("registro " + i);
        let postToCreate =
          this.postsData[
            Utils.getRandomInt(0, this.postsData.length - 1)
          ];
        cy.log(postToCreate);      
        const postContent = postToCreate.content;
        posts.updatePost(postContent, emailLogin, escenario,typeResultSuccess);
      }
    });
  
    it(`${escenario}_DDP_New_Title`, function () {
      cy.log(this.postsData);
      const login = new Login();
      const posts = new Posts();      
      Utils.pruebaID_reset();
      login.login(url, emailLogin, passwordLogin, escenario);
      for (let i = 0; i < Utils.getIterations(); i++) {
        cy.log("registro " + i);
        let postToCreate =
          this.postsData[
            Utils.getRandomInt(0, this.postsData.length - 1)
          ];
        cy.log(postToCreate);      
        const postTitle = postToCreate.title;
        posts.updatePostTitle(postTitle, emailLogin, escenario,typeResultSuccess);
      }
    });
  
  
  it(`${escenario}_DDP_New_Content`, function () {
      cy.log(this.postsData);
      const login = new Login();
      const posts = new Posts();      
      Utils.pruebaID_reset();
      login.login(url, emailLogin, passwordLogin, escenario);
      for (let i = 0; i < Utils.getIterations(); i++) {
        cy.log("registro " + i);
        let postToCreate =
          this.postsData[
            Utils.getRandomInt(0, this.postsData.length - 1)
          ];
        cy.log(postToCreate);      
        const postContent = postToCreate.content;
        posts.updatePostContent(postContent, emailLogin, escenario,typeResultSuccess);
      }
    });
  
  
    it(`${escenario}_DDP_New_Url`, function () {
      cy.log(this.postsData);
      const login = new Login();
      const posts = new Posts();      
      Utils.pruebaID_reset();
      login.login(url, emailLogin, passwordLogin, escenario);
      for (let i = 0; i < Utils.getIterations(); i++) {
        cy.log("registro " + i);
        let postToCreate =
          this.postsData[
            Utils.getRandomInt(0, this.postsData.length - 1)
          ];
        cy.log(postToCreate);      
        const postTitle = postToCreate.title;
        posts.updatePostUrl(postTitle, emailLogin, escenario,typeResultSuccess);
      }
    });
  
  
    it(`${escenario}_DDP_Clear_Data`, function () {
      cy.log(this.postsData);
      const login = new Login();
      const posts = new Posts();      
      Utils.pruebaID_reset();
      login.login(url, emailLogin, passwordLogin, escenario);
      for (let i = 0; i < Utils.getIterations(); i++) {
        cy.log("registro " + i);
        let postToCreate =
          this.postsData[
            Utils.getRandomInt(0, this.postsData.length - 1)
          ];
        cy.log(postToCreate);      
        const postTitle = postToCreate.title;
        const postContent = postToCreate.content;
        posts.updatePostClear(postTitle, postContent, emailLogin, escenario,typeResultSuccess);
      }
    });
  
  
  });
  



/////////////////////////
//Test using Data Online Faker

describe("Update post OFD", () => {

    it(`${escenario}_OFD_SuccessData`, function () {      
      const login = new Login();
      const posts = new Posts();      
      Utils.pruebaID_reset();
      login.login(url, emailLogin, passwordLogin, escenario);
      for (let i = 0; i < Utils.getIterations(); i++) {
        cy.log("registro " + i);                
        const postContent = faker.commerce.productDescription();
        posts.updatePost(postContent, emailLogin, escenario,typeResultSuccess);
      }
    });
  
    it(`${escenario}_OFD_New_Title`, function () {      
      const login = new Login();
      const posts = new Posts();      
      Utils.pruebaID_reset();
      login.login(url, emailLogin, passwordLogin, escenario);
      for (let i = 0; i < Utils.getIterations(); i++) {
        cy.log("registro " + i);          
        const postTitle = faker.commerce.productName();        
        posts.updatePostTitle(postTitle, emailLogin, escenario,typeResultSuccess);
      }
    });
  
  
  it(`${escenario}_OFD_New_Content`, function () {      
      const login = new Login();
      const posts = new Posts();      
      Utils.pruebaID_reset();
      login.login(url, emailLogin, passwordLogin, escenario);
      for (let i = 0; i < Utils.getIterations(); i++) {
        cy.log("registro " + i);                    
        const postContent = faker.commerce.productDescription();
        posts.updatePostContent(postContent, emailLogin, escenario,typeResultSuccess);
      }
    });
  
  
    it(`${escenario}_OFD_New_Url`, function () {      
      const login = new Login();
      const posts = new Posts();      
      Utils.pruebaID_reset();
      login.login(url, emailLogin, passwordLogin, escenario);
      for (let i = 0; i < Utils.getIterations(); i++) {
        cy.log("registro " + i);       
        const postTitle = faker.commerce.productName();        
        posts.updatePostUrl(postTitle, emailLogin, escenario,typeResultSuccess);
      }
    });
  
  
    it(`${escenario}_OFD_Clear_Data`, function () {      
      const login = new Login();
      const posts = new Posts();      
      Utils.pruebaID_reset();
      login.login(url, emailLogin, passwordLogin, escenario);
      for (let i = 0; i < Utils.getIterations(); i++) {
        cy.log("registro " + i);         
        const postTitle = faker.commerce.productName();
        const postContent = faker.commerce.productDescription();
        posts.updatePostClear(postTitle, postContent, emailLogin, escenario,typeResultSuccess);
      }
    });
  
  
  });
  