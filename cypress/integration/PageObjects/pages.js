import Page from "./page"
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
        cy.get('a[href="#/pages/"').click({ force: true });
    }

    getListPages() {
        this.submitLinkPages();
        Utils.delay();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        return this.listPages();
    }

}
export default Pages;