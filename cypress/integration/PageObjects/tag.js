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


    createTag(emailLogin, escenario) {                
        this.submitLinkTags().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());

        this.buttonNewTag().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());   
               
        this.NameTag().clear().type("Nuevo Tag");
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());

        this.buttonSave().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());

        this.submitLinkTags().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
    }

}
export default Tag;