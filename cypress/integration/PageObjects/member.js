import { Utils } from '../../support/utils';

class Member {

    instance = 0;

    setInstance(instance) {
        this.instance = instance;
    }

    open() {
        Utils.navigate('#/members');        
    }

    goToNewMember(){
        Utils.navigate('#/members/new');        
    }
    
    setName(name){
        cy.get('#member-name').first().type(name);
    }

    setEmail(email) {
        cy.get('#member-email').first().type(email);
    }

    setLabel(label){
        cy.get('input[class="ember-power-select-trigger-multiple-input"]').first().type(label);
    }

    setNotes(notes){
        cy.get('#member-note').first().type(notes);
    }

    submmitMember(){
        cy.get('button[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]').click({ force: true });
    }

    listMembers() {
        return cy.get('h3[class="ma0 pa0 gh-members-list-name "]');
    }

    selectFirstMember(){
        cy.get('h3[class="ma0 pa0 gh-members-list-name "]').first().click({ force: true });
    }

    submitSettings(){
        //cy.get('button[class="gh-btn gh-btn-icon icon-only gh-btn-action-icon open ember-view"]');
        cy.get('#ember29').first().click({ force: true });
    }

    submitDeleteMember(){
        cy.get('ul[class="dropdown gh-member-actions-menu dropdown-menu dropdown-triangle-top-right closed fade-out closed ember-view"]').click({ force: true });
        //cy.get('li:nth-child(2) button:nth-child(1)').click({ force: true });
    }

    confirmDeleteMember(){
        cy.get('button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]').click({ force: true });
    }


    createMember(name, email, label, notes, emailLogin, escenario) {
        this.open();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());

        this.goToNewMember();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
        
        this.setName(name);
        this.setEmail(email);
        this.setLabel(label);
        this.setNotes(notes);
        Utils.delay(2000);
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
        
        this.submmitMember();  
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
        
        this.open();    
        Utils.delay(2000);
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
        cy.reload();        
    }


    editMember(note, emailLogin, escenario) {
        this.open();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());

        this.selectFirstMember();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());

        this.setNotes(note);
        Utils.delay(2000);
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
        
        this.submmitMember();  
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
        
        this.open();    
        Utils.delay(2000);
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
        cy.reload();
    }

    deleteMember(emailLogin, escenario) {
        this.open();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
        
        this.selectFirstMember();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
        
        this.submitSettings();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
                
        this.submitDeleteMember();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
                        
        this.confirmDeleteMember();
        Utils.delay(2000);
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
                
        this.open();         
        Utils.delay(2000);
        Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
        cy.reload();
    }
}
export default Member;