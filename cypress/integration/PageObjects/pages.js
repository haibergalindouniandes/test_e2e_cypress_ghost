import Page from "./page";
import { Utils } from '../../support/utils';
const page = new Page();
class Pages {

    instance = 0;

    setInstance(instance) {
        this.instance = instance;
    }

    open() {
        page.navigate('#/pages');
    }

    listPages() {
        return cy.get('li.gh-list-row.gh-posts-list-item.gh-posts-list-item-labs.gh-post-list-plain-status');
    }

    submitLinkPages() {
        return cy.get('a[href="#/pages/"]');
    }

    firstPost() {
        return cy.get('a.ember-view.permalink.gh-list-data.gh-post-list-title').first();
    }

    buttonSettingsPage() {
        return cy.get('button[title="Settings"]');
    }

    buttonDeletePage() {
        return cy.get('button.gh-btn.gh-btn-hover-red.gh-btn-icon.settings-menu-delete-button');
    }

    confirmButtonDeletePage() {
        return cy.get('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view');
    }

    getListPages() {
        this.submitLinkPages().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        return this.listPages();
    }

    buttonNewPage() {
        return cy.get('a[href="#/editor/page/"]'); 
    }   
    
    titlePage() {
        return cy.get('textarea[placeholder="Page title"]'); 
    }

    buttonPublish() {
        cy.get('a[href="#/pages/"').click({ force: true });
        Utils.delay();
        return cy.get('button[class="gh-btn gh-btn-editor darkgrey gh-publish-trigger"]');  
    }

    buttonFinalReview() {
        return cy.get('button[class="gh-btn gh-btn-black gh-btn-large"]');  
    }
 
    buttonPublishNow() {
        return cy.get('button[class="gh-btn gh-btn-large gh-btn-pulse ember-view"]');  
    }

    buttonEdit() {
        return cy.get('a[class="ember-view permalink gh-list-data gh-post-list-button"]').first();  
    }

    buttonUpdate() {
        return cy.get('button[class="gh-btn gh-btn-editor gh-editor-save-trigger green ember-view"]');  
    }


    deleteFirstPage() {
        this.getListPages();
        this.firstPost().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.buttonSettingsPage().click({ force: true });
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.buttonDeletePage().click({ force: true });
        Utils.takeScreenshot(this.instance, this.constructor.name);
        Utils.delay();
        this.confirmButtonDeletePage().click({ force: true });
        Utils.delay(2000);
        Utils.takeScreenshot(this.instance, this.constructor.name);
    }

    createPage() {
        this.submitLinkPages().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.buttonNewPage().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.titlePage().clear().type("holaMundo");        
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.buttonPublish().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.buttonFinalReview().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.buttonPublishNow().click({ force: true });

    }

    modifyPage() {
        this.submitLinkPages().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.buttonEdit().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.titlePage().clear().type("holaMundo Modificado");        
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.buttonUpdate().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.submitLinkPages().click({ force: true });  

    }

}
export default Pages;