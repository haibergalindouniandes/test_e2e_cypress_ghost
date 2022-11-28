import { Utils } from '../../support/utils';
class Staff {

    instance = 0;

    setInstance(instance) {
        this.instance = instance;
    }

    email(email) {
        if (String(email).length > 0) {
            cy.get('input#new-user-email.email.ember-text-field.gh-input.ember-view').first().type(email);
        }
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
        Utils.navigate('#/settings/staff');
    }

    listPeopleInvited() {
        return cy.get('h3.apps-card-app-title');
    }

    selectfisrtActiveUser() {
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

    getDivsResponseError() {
        return cy.get("p[class='response']");
    }

    getDivClose() {
        return cy.get("a[class='close']");
    }

    sendInvitation(email, emailLogin, escenario) {
        this.open();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());

        this.submitSettingsButton();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());

        this.email(email);
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());

        this.radios().last().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());

        this.submitSendButton();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());
    }

    revokeInvitation(email, emailLogin, escenario) {
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());
        Utils.delay(2000);
        cy.get('h3.apps-card-app-title').each(($el, index, $list) => {
            if ($el.text() == email) {
                cy.get('a.apps-configured-action.red-hover').first().click({ force: true });
            }
        });
        Utils.delay(2000);
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());
        cy.reload();
    }

    changePassword(oldPass, newPass, emailLogin, escenario) {
        this.open();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());

        this.selectfisrtActiveUser();
        Utils.delay(2000);
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());

        this.setOldPasword(oldPass);
        this.setNewPasword(newPass);
        this.setConfirmPasword(newPass);
        Utils.delay(7000);
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());

        this.submitChangePassButton();
        Utils.delay(2000);
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());

        this.open();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());
    }

}
export default Staff;