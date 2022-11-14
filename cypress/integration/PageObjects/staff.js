import Page from "./page";
import { Utils } from '../../support/utils';
const page = new Page();
class Staff {

    instance = 0;

    setInstance(instance) {
        this.instance = instance;
    }

    email(email) {
        cy.get('input#new-user-email.email.ember-text-field.gh-input.ember-view').first().type(email);
    }
    
    getSpecificEmail(email) {
        return cy.get(`//h3[normalize-space()='${email}']`).first().type(email);        
    }

    radios() {
        return cy.get('div.gh-radio-label');
    }

    submitSettingsButton() {
        cy.get('button.gh-btn.gh-btn-primary').click({ force: true });
    }

    submitSendButton() {
        cy.get('button.gh-btn.gh-btn-black.gh-btn-icon.ember-view').click({ force: true });
    }

    open() {
        page.navigate('#/settings/staff');
    }

    listPeopleInvited() {
        return cy.get('h3.apps-card-app-title');
    }

    selectfisrtActiveUser() {
        //cy.get('a[class="ember-view"]').first().click({ force: true });
        cy.get('div[class="apps-grid-cell tooltip-centered"] a[class="ember-view"]').click({ force: true });
    }    
    
    setOldPasword(oldPass) {
        cy.get('#user-password-old').first().type(oldPass);
    }

    setNewPasword(newPass) {
        cy.get('#user-password-new').first().type(newPass);
    }

    setConfirmPasword(newPass) {
        cy.get('#user-new-password-verification').first().type(newPass);
    }

    submitChangePassButton() {
        cy.get('button[class="gh-btn gh-btn-icon button-change-password gh-btn-red ember-view"]').click({ force: true });
    }
    
    sendInvitation(email) {
        this.open();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.submitSettingsButton();
        this.email(email);
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.radios().last().click({ force: true });
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.submitSendButton();
        Utils.delay(2000);
        cy.reload();
    }

    revokeInvitation(email) {      
        Utils.takeScreenshot(this.instance, this.constructor.name);        
        Utils.delay(2000);
        //cy.get('h3.apps-card-app-title').should('to.contain', email).focus();
        cy.get('h3.apps-card-app-title').each(($el, index, $list) => {
            // $el is a wrapped jQuery element
            if ($el.text() == email) {
              // wrap this element so we can
              // use cypress commands on it
              cy.get('a.apps-configured-action.red-hover').first().click({force:true});
              
            } else {
              // do something else
            }
          });
        
        Utils.delay(2000);       
        cy.reload();
    }

    changePassword(oldPass,newPass) {
        this.open();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.selectfisrtActiveUser();        
        Utils.takeScreenshot(this.instance, this.constructor.name);
        Utils.delay(2000);
        this.setOldPasword(oldPass);
        this.setNewPasword(newPass);
        this.setConfirmPasword(newPass);
        Utils.takeScreenshot(this.instance, this.constructor.name);
        Utils.delay(7000);
        this.submitChangePassButton();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        Utils.delay(2000);
        this.open();
        cy.reload();
    }

}
export default Staff;