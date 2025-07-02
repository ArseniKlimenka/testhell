// eslint-disable-next-line import/no-unresolved
const fixtures = require('../../fixtures');
const legalEntity = require('./parties/legal-entity-page');
const contract = require('./contracts/contract-page');

class Menu {

    navigateToAddLegalEntity() {
        legalEntity.url.navigateToUrl(Cypress.config('baseUrl'));

        cy.get(fixtures.menuSelectors.parties).click({force: true});
        cy.get(fixtures.menuSelectors.legalEntity).click({force: true});

        legalEntity.url.verifyUrl(Cypress.config('baseUrl') + fixtures.menuSelectors.urlLegalEntity);
        legalEntity.overlay.waitToDisappear();
    }

    navigateToAddInvestmentLifeInsuranceQuote() {
        contract.url.navigateToUrl(Cypress.config('baseUrl'));

        cy.get(fixtures.menuSelectors.contracts).click({force: true});
        cy.get(fixtures.menuSelectors.investmentLifeInsuranceQuote).click({force: true});

        contract.url.verifyUrl(Cypress.config('baseUrl') + fixtures.menuSelectors.urlInvestmentLifeInsuranceQuote);
        contract.overlay.waitToDisappear();
    }
}

module.exports = new Menu();
