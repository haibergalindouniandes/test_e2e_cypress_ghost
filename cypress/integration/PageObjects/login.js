import { Utils } from '../../support/utils';

class Login {

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

    login(url, email, password, escenario) {        
        this.open(url);        
        this.email(email);
        this.password(password);
        Utils.takeScreenshot(email, escenario, "Paso_"+Utils.pruebaID());
        this.submit();
        Utils.delay();
    }    
}
export default Login;