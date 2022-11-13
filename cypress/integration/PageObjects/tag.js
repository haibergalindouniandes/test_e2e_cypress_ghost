import { Utils } from '../../support/utils';

class Tag {

    instance = 0;    

    setInstance(instance) {
        this.instance = instance;
    }   
   
    submitLinkTags() {
        return cy.get('a[href="#/tags/"]').first(); 
    }

    buttonNewTag() {
        return cy.get('a[href="#/tags/new/"]').first(); 
    }
 
    NameTag() {
        return cy.get('input[id="tag-name"]'); 
    }
     
    buttonSave() {
        return cy.get('button[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]'); 
    }


    createTag() {                
        this.submitLinkTags().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);

        this.buttonNewTag().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);   
               
        this.NameTag().clear().type("Nuevo Tag");
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);

        this.buttonSave().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);

        this.submitLinkTags().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);




    }

}
export default Tag;