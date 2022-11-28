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
const escenario = "04_create_post";
const typeResultSuccess = "success";
const typeResultError = "Error";

//Test using data pool a priori
describe("Create post DPAP", () => {
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
      const postTitle = postToCreate.title;
      const postContent = postToCreate.content;
      posts.createPost(postTitle, postContent, emailLogin, escenario,typeResultSuccess);
    }
  });

  it(`${escenario}_DPAP_NULL_TITLE_Data`, function () {
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
      const postTitle = "";
      const postContent = postToCreate.content;
      posts.createPost(postTitle, postContent, emailLogin, escenario,typeResultSuccess);
    }
  });

  it(`${escenario}_DPAP_NULL_CONTENT_Data`, function () {
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
      const postContent = "";
      posts.createPost(postTitle, postContent, emailLogin, escenario,typeResultSuccess);
    }
  });

  it(`${escenario}_DPAP_LOGIN_ERROR_Data`, function () {
    cy.log(this.postDataFixture);
    const login = new Login();
    const posts = new Posts();
    Utils.pruebaID_reset();

    login.login(url, emailLogin+Utils.getRandomInt(0, Utils.getIterations() ), passwordLogin, escenario);    
    
  });


  it(`${escenario}_DPAP_NULL_Data`, function () {
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
      const postTitle = "";
      const postContent = "";
      posts.createPost(postTitle, postContent, emailLogin, escenario,typeResultError);
    }
  });


});



///////////////

//Test using dynamic Data
describe("Create post DDP", () => {
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
        const postTitle = postToCreate.title;
        const postContent = postToCreate.content;
        posts.createPost(postTitle, postContent, emailLogin, escenario,typeResultSuccess);
      }
    });
  
    it(`${escenario}_DDP_NULL_TITLE_Data`, function () {
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
        const postTitle = "";
        const postContent = postToCreate.content;
        posts.createPost(postTitle, postContent, emailLogin, escenario,typeResultSuccess);
      }   
    });
  
    it(`${escenario}_DDP_NULL_CONTENT_Data`, function () {
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
        const postContent = "";
        posts.createPost(postTitle, postContent, emailLogin, escenario,typeResultSuccess);
      }
    });
  
    it(`${escenario}_DDP_LOGIN_ERROR_Data`, function () {
      cy.log(this.postsData);
      const login = new Login();
      const posts = new Posts();
      Utils.pruebaID_reset();
      login.login(url, emailLogin+Utils.getRandomInt(0, Utils.getIterations() ), passwordLogin, escenario);
      
    });
  
  
    it(`${escenario}_DDP_NULL_Data`, function () {
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
        const postTitle = "";
        const postContent = "";
        posts.createPost(postTitle, postContent, emailLogin, escenario,typeResultError);
      }
    });
  
  
  });
  


///////////////////////////////////////

//Test using data online Faker
describe("Create post OFD", () => {
  
    it(`${escenario}_OFD_SuccessData`, function () {
      
      const login = new Login();
      const posts = new Posts();
      Utils.pruebaID_reset();
      login.login(url, emailLogin, passwordLogin, escenario);
      for (let i = 0; i < Utils.getIterations(); i++) {
        cy.log("registro " + i);
        
        const postTitle = faker.commerce.productName();
        const postContent = faker.commerce.productDescription();
        posts.createPost(postTitle, postContent, emailLogin, escenario,typeResultSuccess);
      }
    });
  
    it(`${escenario}_OFD_NULL_TITLE_Data`, function () {
        
        const login = new Login();
        const posts = new Posts();
        Utils.pruebaID_reset();
        login.login(url, emailLogin, passwordLogin, escenario);   
        for (let i = 0; i < Utils.getIterations(); i++) {
          cy.log("registro " + i);
          
         
        const postTitle = faker.commerce.productName();
        const postContent = faker.commerce.productDescription();
          posts.createPost(postTitle, postContent, emailLogin, escenario);
        }       
    });
  
    it(`${escenario}_OFD_NULL_CONTENT_Data`, function () {
      
      const login = new Login();
      const posts = new Posts();
      Utils.pruebaID_reset();
      login.login(url, emailLogin, passwordLogin, escenario);
      for (let i = 0; i < Utils.getIterations(); i++) {
        cy.log("registro " + i);        
        const postTitle = faker.commerce.productName();
        const postContent = "";
        posts.createPost(postTitle, postContent, emailLogin, escenario,typeResultSuccess);
      }
    });
  
    it(`${escenario}_DDP_LOGIN_ERROR_Data`, function () {      
      const login = new Login();
      const posts = new Posts();
      Utils.pruebaID_reset();
      login.login(url, emailLogin+Utils.getRandomInt(0, Utils.getIterations() ), passwordLogin, escenario);      
    });
  
  
    it(`${escenario}_OFD_NULL_Data`, function () {      
      const login = new Login();
      const posts = new Posts();
      Utils.pruebaID_reset();
      login.login(url, emailLogin, passwordLogin, escenario);
      for (let i = 0; i < Utils.getIterations(); i++) {
        cy.log("registro " + i);        
        const postTitle = "";
        const postContent = "";
        posts.createPost(postTitle, postContent, emailLogin, escenario,typeResultError);
      }
    });
  
  
  });
  