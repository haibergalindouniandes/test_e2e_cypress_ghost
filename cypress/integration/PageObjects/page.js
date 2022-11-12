const siteUrl = Cypress.config('baseUrl') || "http://localhost:2368/ghost/";

class Page {
    // @path path of the sub page (e.g. /path/to/page.html)
    navigate(path) {
        cy.visit(`${siteUrl}${path}`)
    }
}

export default Page;