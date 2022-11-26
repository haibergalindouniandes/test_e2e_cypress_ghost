const delay = Cypress.env('delay') || 1000;
const siteUrl = Cypress.config('baseUrl') || "http://localhost:2368/ghost/";
const url = Cypress.env('url') || "http://localhost:2368/ghost/#/signin";
const dashboardPage = Cypress.env('dashboardPage') || "http://localhost:2368/ghost/#/dashboard";
const staffPage = Cypress.env('staffPage') || "http://localhost:2368/ghost/#/settings/staff";
const memberPage = Cypress.env("memberPage") || "http://localhost:2368/ghost/#/members";
const emailLogin = Cypress.env('emailLogin') || "h.galindos@uniandes.edu.co";
const passwordLogin = Cypress.env('passwordLogin') || "Zl@ifer619";
const newPassword = Cypress.env('newPassword') || "Zl@ifer619";
const urlApiMockarooAccounts = 'https://my.api.mockaroo.com/pas/random/data/member.json';
const apikeyMockarooAccounts = 'ef45f480';
const iterations = 5;

let counter = 0;
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
    static takeScreenshot(emailLogin, escenario, paso) {
        this.delay();
        //cy.screenshot(`${emailLogin}/${escenario}/${paso}`);
        cy.screenshot(`${paso}`);
        this.delay();
    };

    //Function to get a url
    static navigate(path) {
        cy.visit(`${siteUrl}${path}`)
    }

    //Function that reset step 
    static pruebaID_reset() {
        counter = 0;

    };
    //Function that assigns step 
    static pruebaID() {
        counter = counter + 1;
        return counter;

    };

    //Function to get url
    static getUrl() {
        return url;
    };

    //Function to get email
    static getEmail() {
        return emailLogin;
    };

    //Function to get password
    static getPassword() {
        return passwordLogin;
    };

    //Function to get dashboardPage
    static getDashboardPage() {
        return dashboardPage;
    };

    //Function to get staffPage
    static getStaffPage() {
        return staffPage;
    };

    //Function to get newPassword
    static getNewPassword() {
        return newPassword;
    };

    //Function to get memberPage
    static getMemberPage() {
        return memberPage;
    };

    //Function to get number of iterations
    static getIterations() {
        return iterations;        
    };

    //Function to get endpoint to mockaroo of accounts
    static getEndPointMockarooAccounts() {
        return urlApiMockarooAccounts;
    };

    //Function to get apikey to mockaroo of accounts
    static getApikeyMockarooAccounts() {
        return apikeyMockarooAccounts;
    };

    //Function to allows slice a string 
    static sliceString(value, position) {
        return value.slice(0, position);
    }

    //Function to allows remove spaces in a string 
    static removeSpacesString(value) {
        return value.replaceAll(' ', '');
    }

    //Function to allows to complete a string 
    static completeString(valueToComplete, referenceValue, countCharacters, type) {
        let stringCompleted = '';
        let countRefCharacters = valueToComplete.length;
        cy.log(countRefCharacters)
        let refValueWithoutSpaces = this.removeSpacesString(referenceValue);
        cy.log(refValueWithoutSpaces)
        let countDifferences = countCharacters - countRefCharacters;
        cy.log(countDifferences)
        let stringSliced = this.sliceString(refValueWithoutSpaces, countDifferences);
        cy.log(stringSliced)
        if (type === 'start') {
            stringCompleted = stringSliced.concat(valueToComplete);
        } else {
            stringCompleted = valueToComplete.concat(stringSliced);
        }
        cy.log(stringCompleted)

        return stringCompleted;
    }

}