import { Utils } from '../../support/utils';
export default class Profile {

    instance = 0;

    setInstance(instance) {
        this.instance = instance;
    }

    submitAvatar() {
        return cy.get('div.gh-user-avatar.relative');
    }

    submitProfile() {
        return cy.get('li a.ember-view.dropdown-item').contains('Your profile');
    }

    fullName() {
        return cy.get('input#user-name');
    }

    slug() {
        return cy.get('input#user-slug');
    }

    location() {
        return cy.get('input#user-location');
    }

    website() {
        return cy.get('input#user-website');
    }

    bio() {
        return cy.get('textarea#user-bio');
    }

    bottonSave() {
        return cy.get('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view');
    }

    getUrlPage() {
        return cy.url();
    }

    open() {
        Utils.navigate('#/settings/staff/');        
    }

    editProfile(fullName, slug, location, website, bio, emailLogin, escenario) {
        this.submitAvatar().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());

        this.submitProfile().click({ force: true });
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
        
        this.fullName().clear().type(fullName);
        this.slug().clear().type(slug);
        this.location().clear().type(location);
        this.website().clear().type(website);
        this.bio().clear().type(bio);
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
        
        this.bottonSave().click({ force: true });
        Utils.delay(1000);
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
        cy.reload()
        Utils.delay(1000);
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
    }
}