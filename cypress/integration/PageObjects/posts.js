import { Utils } from '../../support/utils';
import Pages from './pages';
class Posts {

    instance = 0;    

    setInstance(instance) {
        this.instance = instance;
    }
  
    submitLinkPosts() {
        return cy.get('a[href="#/posts/"]').first(); 
    }

    buttonNewPost(){
        return cy.get('a[class="ember-view gh-btn gh-btn-primary view-actions-top-row"]');
    }

    inputNewPostTitle(){
        return cy.get('textarea[placeholder="Post title"]');
    }

    inputNewPostContent(){
        return cy.get('div[class="koenig-editor__editor __mobiledoc-editor __has-no-content"]');
    }

    changePostContent(){
        return cy.get('.koenig-editor__editor');
    }

    buttonReviewPost(){
        return cy.get('button[class="gh-btn gh-btn-editor gh-editor-preview-trigger"]');
    }

    buttonPublishPost() {
        return cy.get('.right > .darkgrey > span');  
    }

    buttonFinalReview(){
        return cy.get('button[class="gh-btn gh-btn-black gh-btn-large"]');
    }

    buttonPublishPostNow(){
        return cy.get('button[class="gh-btn gh-btn-large gh-btn-pulse ember-view"]');
    }

    showNewPost(){
        return cy.get('a[class="gh-post-bookmark-wrapper"]');
    }

    showPostSettingExcerpt(){
        return cy.get('#custom-excerpt');
    }

    showPostSettingCheckbox(){
        return cy.get('.checkbox > p');
    }
    
    firstPost() {
        return cy.get('a[class="ember-view permalink gh-list-data gh-post-list-button"').first();
    }

    buttonEditPost() {
        return cy.get('a[class="ember-view gh-post-list-cta edit"]');
    }

    buttonSettingsPost() {
        return cy.get('button[class="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]');
    }

    buttonDeletePost() {
        return cy.get('button[class="gh-btn gh-btn-hover-red gh-btn-icon settings-menu-delete-button"]');
    }

    confirmButtonDeletePost() {
        return cy.get('button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]');
    }

     getListPosts(emailLogin, escenario) {
         this.submitLinkPosts().click({ force: true });
         Utils.delay();
         Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
         return this.submitLinkPosts();
     }
    
    deleteFirstPost(emailLogin, escenario) {                    
        this.submitLinkPosts().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());

        this.firstPost().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());       
       
        this.buttonEditPost().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
     
        this.buttonSettingsPost().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());

        this.buttonDeletePost().click({ force: true });
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
        Utils.delay();

        this.confirmButtonDeletePost().click({ force: true });
        Utils.delay(2000);
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());       


    }

    createPost(postTitle,postContent, emailLogin, escenario) {
        this.submitLinkPosts().click({ force: true});
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());

        this.buttonNewPost().click({force: true});
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());

        this.inputNewPostTitle().clear().type(postTitle);
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());

        this.inputNewPostContent().clear().type(postContent);
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());

        this.buttonReviewPost().click({force: true});
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());

        this.buttonPublishPost().click({force: true});
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());

        this.buttonFinalReview().click({force: true});
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
    
        this.buttonPublishPostNow().click({force: true});
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
    
        this.showNewPost().click({force: true});
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
    }

    updatePost(postContent) {                
        this.submitLinkPosts().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);

        this.firstPost().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);       
       
        //this.buttonEditPost().click({ force: true });
        //Utils.delay();
        //Utils.takeScreenshot(this.instance, this.constructor.name);

        //modificar contenido
        this.changePostContent().clear().type(postContent);
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);
     
        this.buttonSettingsPost().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);

        this.showPostSettingExcerpt().clear().type(postContent);
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);
    
        this.showPostSettingCheckbox().click();
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);
    }

    publishPost(postTitle,postContent) {
        this.submitLinkPosts().click({ force: true});
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);

        this.buttonNewPost().click({force: true});
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);

        this.inputNewPostTitle().clear().type(postTitle);
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);

        this.inputNewPostContent().clear().type(postContent);
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);

        this.buttonReviewPost().click({force: true});
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);

        this.buttonPublishPost().click({force: true});
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);

        this.buttonFinalReview().click({force: true});
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);
    
        this.buttonPublishPostNow().click({force: true});
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);
    
        this.showNewPost().click({force: true});
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);
    }

}
export default Posts;