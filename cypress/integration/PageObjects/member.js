import Page from "./page";
import { Utils } from '../../support/utils';
const page = new Page();

class Member {

    instance = 0;

    setInstance(instance) {
        this.instance = instance;
    }

    open() {
        page.navigate('#/members');
    }

    goToNewMember(){
        page.navigate('#/members/new');
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
        cy.get('#ember29').first().click({ force: true });
    }

    submitDeleteMember(){
        cy.get('li:nth-child(2) button:nth-child(1)').click({ force: true });
    }

    confirmDeleteMember(){
        cy.get('button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]').click({ force: true });
    }


    createMember(name,email,label,notes) {
        this.open();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.goToNewMember();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.setName(name);
        this.setEmail(email);
        this.setLabel(label);
        this.setNotes(notes);
        Utils.takeScreenshot(this.instance, this.constructor.name);
        Utils.delay(2000);
        this.submmitMember();  
        Utils.takeScreenshot(this.instance, this.constructor.name);
        Utils.delay(1000);
        this.open();    
        Utils.delay(2000);
        cy.reload();
    }


    editMember(note) {
        this.open();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.selectFirstMember();
        this.setNotes(note);
        Utils.takeScreenshot(this.instance, this.constructor.name);
        Utils.delay(2000);
        this.submmitMember();  
        Utils.takeScreenshot(this.instance, this.constructor.name);
        Utils.delay(1000);
        this.open();    
        Utils.delay(2000);
        cy.reload();
    }

    deleteMember() {
        this.open();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        this.selectFirstMember();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        Utils.delay(500);
        this.submitSettings();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        Utils.delay(500);
        this.submitDeleteMember();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        Utils.delay(500);        
        this.confirmDeleteMember();
        Utils.takeScreenshot(this.instance, this.constructor.name);
        Utils.delay(2000);        
        this.open();    
        Utils.delay(2000);
        cy.reload();
    }
}
export default Member;