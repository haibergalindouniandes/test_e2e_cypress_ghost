import { Utils } from '../../support/utils';

class Member {

    instance = 0;

    setInstance(instance) {
        this.instance = instance;
    }

    open() {
        Utils.navigate('#/members');
    }

    signout() {
        Utils.navigate('#/signout/');
        Utils.delay();
    }

    goToNewMember() {
        Utils.navigate('#/members/new');
    }

    getName() {
        return cy.get('#member-name');
    }

    getLeaveBtn() {
        return cy.get('span').contains('Leave').first();
    }

    getStayBtn() {
        return cy.get('span').contains('Stay').first();
    }

    getDivsResponseError() {
        return cy.get("p[class='response']");
    }

    getInputLabel() {
        return cy.get('input[class="ember-power-select-trigger-multiple-input"]').first();
    }

    getInputNotes() {
        return cy.get('#member-note');
    }

    getAddListLabel() {
        return cy.get('ul.ember-power-select-options > li');
    }

    setName(name) {
        if (String(name).length > 0) {
            cy.get('#member-name').clear().first().type(name);
        }
        else {
            cy.get('#member-name').clear();
        }
    }

    setEmail(email) {
        if (String(email).length > 0) {
            cy.get('#member-email').clear().first().type(email);
        }
        else {
            cy.get('#member-email').clear()
        }
    }

    setLabel(label) {
        if (String(label).length > 0) {
            cy.get('input[class="ember-power-select-trigger-multiple-input"]').clear().first().type(label);
        }
    }

    setNotes(notes) {
        if (String(notes).length > 0) {
            cy.get('#member-note').clear().first().type(notes);
        }
    }

    submmitMember() {
        cy.get('button[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]').click({ force: true });
    }

    listMembers() {
        return cy.get('h3[class="ma0 pa0 gh-members-list-name "]');
    }

    selectFirstMember() {
        cy.get('a[class="ember-view gh-list-data"').first().click({ force: true });
    }

    submitSettings() {
        cy.get('button[class="gh-btn gh-btn-icon icon-only gh-btn-action-icon closed ember-view"').click({ force: true });
    }

    submitDeleteMember() {
        cy.get('span[class="red"').click({ force: true });
    }

    confirmDeleteMember() {
        cy.get('button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]').click({ force: true });
    }

    leaveButton() {
        cy.get('button[class="gh-btn gh-btn-red"]').click({ force: true });
    }

    updatedMemberConfirmationFail() {
        return cy.get('button[class="gh-btn gh-btn-primary gh-btn-icon gh-btn-red ember-view"]');
    }

    updatedMemberConfirmationOk() {
        return cy.get('button[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]');
    }

    signout() {
        Utils.navigate('#/signout/');
        Utils.delay();
    }

    getDivsResponseError() {
        return cy.get("div[class='form-group mb0 gh-member-note error ember-view'] p[class='response']");
    }


    createMember(name, email, label, notes, emailLogin, escenario) {
        this.open();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());

        this.goToNewMember();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());

        this.setName(name);
        this.setEmail(email);
        this.setLabel(label);
        this.getAddListLabel().first().click();
        this.getName().click()
        this.getInputNotes().type(notes);
        this.getName().click()
        Utils.delay(2000);
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());

        this.submmitMember();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());

        this.open();
        Utils.delay(2000);
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());
    }


    editMember(name, email, label, notes, emailLogin, escenario) {
        this.open();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());

        this.selectFirstMember();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());

        this.setName(name);
        this.setEmail(email);
        this.setLabel(label);
        this.setNotes(notes);
        Utils.delay(2000);
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());

        this.submmitMember();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());  
        
        if(escenario==='07_edit_member/Invalid_email' || escenario==='07_edit_member/Null_email' || escenario==='07_edit_member/Note_greater_500_characters') {
            this.updatedMemberConfirmationFail().each((element) => {                
                let message = element.find('span')[0].innerHTML;
                expect(message).contains("Retry");
            })
            this.open();
            Utils.delay();
            this.leaveButton();            
            Utils.delay(2000);
            Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());
        }
        else{
            this.updatedMemberConfirmationOk().each((element) => {                
                let message = element.find('span')[0].innerHTML;
                expect(message).contains("Save");
            })
            this.open();
            Utils.delay(2000);
            Utils.takeScreenshot(emailLogin, escenario, "Paso_"+Utils.pruebaID());            
        }
    }

    deleteMember(emailLogin, escenario) {
        this.open();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());

        this.selectFirstMember();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());

        this.submitSettings();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());

        this.submitDeleteMember();
        Utils.delay();
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());

        this.confirmDeleteMember();
        Utils.delay(2000);
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());

        this.open();
        Utils.delay(2000);
        Utils.takeScreenshot(emailLogin, escenario, "Paso_" + Utils.pruebaID());
    }

}
export default Member;