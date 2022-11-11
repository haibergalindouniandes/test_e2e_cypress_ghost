const delay = Cypress.env('delay') || 1000;
export class Utils {
    //Function that generates the attempts randomly
    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    //Function that generates the timestamp
    static getCurrentTimestamp() {
        return Math.floor(Date.now() / 1000);
    };

    //Function that delay a seconds
    static delay(delaySeconds) {
        if (delaySeconds != undefined) {
            cy.wait(delaySeconds)
        } else {
            cy.wait(delay)
        }
    };

    //Function that takes a screenshot
    static takeScreenshot(instance, page) {
        this.delay();
        cy.screenshot(`${instance}/${page}`);
        this.delay();
    };

}