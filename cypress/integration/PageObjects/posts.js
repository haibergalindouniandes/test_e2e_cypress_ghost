import { Utils } from '../../support/utils';

class Posts {

    instance = 0;    

    setInstance(instance) {
        this.instance = instance;
    }
  
    submitLinkPosts() {
        return cy.get('a[href="#/posts/"]').first(); 
    }

    firstPost() {
        return cy.get('a[class="ember-view permalink gh-list-data gh-post-list-button"]').first();
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

    getListPosts() {
        this.submitLinkPosts().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        return this.submitLinkPosts();
    }
    
    deleteFirstPost() {                
        this.submitLinkPosts().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);

        this.firstPost().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);       
       
        this.buttonEditPost().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);
     
        this.buttonSettingsPost().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);

        this.buttonDeletePost().click({ force: true });
        Utils.takeScreenshot(this.instance, this.constructor.name);
        Utils.delay();

        this.confirmButtonDeletePost().click({ force: true });
        Utils.delay(2000);
        Utils.takeScreenshot(this.instance, this.constructor.name);       


    }

}
export default Posts;