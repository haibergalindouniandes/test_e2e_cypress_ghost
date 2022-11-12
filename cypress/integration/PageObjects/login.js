import Page from "./page";
import { Utils } from '../../support/utils';
const page = new Page();
class Login {

    instance = 0;

    setInstance(instance) {
        this.instance = instance;
    }

    email(email) {
        cy.get('#ember6').clear().type(email);
    }

    password(password) {
        cy.get('#ember8').clear().type(password);
    }

    submit() {
        cy.get('button[type="submit"]').click({ force: true });
    }

    open() {
        page.navigate('#/signin');
    }

    login(email, password) {
        this.open();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.email(email);
        this.password(password);
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.submit();
    }
}
export default Login;