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
        return cy.get('a[href="#/pages/"');
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

}
export default Pages;