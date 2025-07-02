/* eslint-disable import/no-unresolved */
/* eslint-disable spaced-comment */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable promise/no-nesting */

/**
 * Login Page.
 */

const fixtures = require('../../fixtures');

class LoginPage {

    logIn(baseUrl, url, username, password, identityServerUrl) {

        cy.task('log', 'Base Url: ' + baseUrl);
        cy.task('log', 'Logging in with username: ' + username);
        cy.task('log', 'Logging in with password: ' + password);
        cy.task('log', 'Page Under Test: ' + baseUrl + url);
        cy.task('log', 'Identity Server URL: ' + identityServerUrl);

        let loginSelectors = '';
        if (Cypress.env('keycloak')) {
            loginSelectors = fixtures.loginPageSelectorsKeycloak;
        } else {
            loginSelectors = fixtures.loginPageSelectorsIdentity;
        }

        cy.visit(baseUrl);

        cy.url().should('include', baseUrl);

        cy.get(loginSelectors.enterButton).click({ force: true });

        cy.url().should('not.include', baseUrl);

        const args = { username, password, loginSelectors };

        cy.origin(identityServerUrl, { args }, (args) => {
            cy.get(args.loginSelectors.username).type(args.username);
            cy.get(args.loginSelectors.password).type(args.password);
            cy.get(args.loginSelectors.loginButton).click({ force: true });
        });

        cy.url().should('include', baseUrl);

        cy.get(loginSelectors.headerDropdownMenu).should('exist');
    }

}

module.exports = new LoginPage();
