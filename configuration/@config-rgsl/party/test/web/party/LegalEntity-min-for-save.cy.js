// type definitions for Cypress object "cy"
// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
// type definitions for custom commands like "login"
'use strict';
// eslint-disable-next-line import/no-unresolved
const testLibs = require('../../../../../test/web/libs');
const { generateOGRN } = require('../../../../../test/web/libs/generateData');
const commonFixtures = require('../../../../../test/web/fixtures');
const fixtures = require('../fixtures');
const OGRNOGRNIP = generateOGRN();

describe('Testing Party Registration.', function () {

    before(function () {
        cy.session('performLoginSequence', () => {
            testLibs.loginPage.logIn(Cypress.config('baseUrl'), commonFixtures.menuSelectors.urlInvestmentLifeInsuranceQuote, Cypress.env('username'), Cypress.env('password'), Cypress.env('identityServerUrl'));
        });
    });

    beforeEach(function () {
        testLibs.menu.navigateToAddLegalEntity();
    });

    it('Create - Legal Entity', function () {

        testLibs.legalEntity.fullOrgName.setValue(fixtures.legalEntityMinPreparationData.partyOrganisationData.fullOrgName);
        testLibs.legalEntity.fullOrgName.checkValue(fixtures.legalEntityMinPreparationData.partyOrganisationData.fullOrgName);

        testLibs.legalEntity.shortOrgName.setValue(fixtures.legalEntityMinPreparationData.partyOrganisationData.shortOrgName);
        testLibs.legalEntity.shortOrgName.checkValue(fixtures.legalEntityMinPreparationData.partyOrganisationData.shortOrgName);

        testLibs.legalEntity.OGRNOGRNIP.setValue(OGRNOGRNIP);
        testLibs.legalEntity.OGRNOGRNIP.checkValue(OGRNOGRNIP);

        testLibs.legalEntity.dateOfStateRegistrationInput.setValue(fixtures.legalEntityMinPreparationData.partyOrganisationData.partyOGRN.dateOfStateRegistration);
        testLibs.legalEntity.dateOfStateRegistrationInput.checkValue(fixtures.legalEntityMinPreparationData.partyOrganisationData.partyOGRN.dateOfStateRegistration);

        testLibs.legalEntity.registrationAgencyCode.select(fixtures.legalEntityMinPreparationData.partyOrganisationData.partyOGRN.registrationAgencyDescription);
        testLibs.legalEntity.registrationAgencyCode.checkValue(fixtures.legalEntityMinPreparationData.partyOrganisationData.partyOGRN.registrationAgencyDescription);

        testLibs.legalEntity.INNKIO.setValue(fixtures.legalEntityMinPreparationData.partyGeneralData.INNKIO);
        testLibs.legalEntity.INNKIO.checkValue(fixtures.legalEntityMinPreparationData.partyGeneralData.INNKIO);

        testLibs.legalEntity.footer.save();
        cy.wait(3000);
        cy.url().should('include', `code=`); // Need to select ID

        // testLibs.legalEntity.header.logOut();

    });
});
