import Page from "./page";
import { Utils } from '../../support/utils';
const page = new Page();
class GeneralSettings {

    instance = 0;

    setInstance(instance) {
        this.instance = instance;
    }

    expandablesBlock() {
        return cy.get('div.gh-expandable-block div.gh-expandable-header');
    }

    clickSpecificExpandablesBlock(elementToSearch) {
        this.expandablesBlock().each(($title) => {
            if ($title.text().trim().includes(elementToSearch)) {
                cy.wrap($title).within(() => {
                    cy.get('button.gh-btn').click({ force: true });
                })
            }
        });
    }

    twitterTitle() {
        return cy.get('#twitterTitle');
    }

    twitterDescription() {
        return cy.get('#twitterDescription');
    }

    submitSaveButton() {
        return cy.get('button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view');
    }

    open() {
        page.navigate('#/settings/general');
    }

    editTimeCardTwiter(title, description) {
        this.open();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.clickSpecificExpandablesBlock('Twitter card');
        this.twitterTitle().clear().type(title, { force: true });
        this.twitterDescription().clear().type(description, { force: true });
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.submitSaveButton().click({ force: true });
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.submitSaveButton();
        Utils.delay(1000);
        cy.reload()
        Utils.delay(3000);
        this.clickSpecificExpandablesBlock('Twitter card');
    }
}
export default GeneralSettings;