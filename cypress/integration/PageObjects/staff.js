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
}
export default Staff;