import { Utils } from '../../support/utils';

class Login2 {

    email(email) {
        cy.get('input[name="identification"]').clear().type(email);
    }

    password(password) {
        cy.get('input[name="password"]').clear().type(password);
    }

    submit() {
        cy.get('button[type="submit"]').click({ force: true });
    }

    open(url) {
        cy.visit(url);
        Utils.delay();
    
    }

    login(url, email, password) {
        this.open(url);
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.email(email);
        this.password(password);
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.submit();
        Utils.delay();
    }    
}
export default Login2;