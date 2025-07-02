// type definitions for Cypress object "cy"
// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
// type definitions for custom commands like "login"
'use strict';
// eslint-disable-next-line import/no-unresolved
const testLibs = require('../../../../../test/web/libs');
const commonFixtures = require('../../../../../test/web/fixtures');
const commonTestData = require('../../../../../test/web/fixtures/testData/commonTestData.json');
const fixtures = require('../fixtures');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const body = fixtures.investmentLifeInsuranceTestPreparation;

describe(`Create Investment Life Insurance Policy (${body.mainInsuranceConditions?.partner?.partnerBusinessCode} - ${body.mainInsuranceConditions?.insuranceProduct?.productDescription}).`, function () {

    before(function () {
        cy.session('performLoginSequence', () => {
            testLibs.loginPage.logIn(Cypress.config('baseUrl'), commonFixtures.menuSelectors.urlInvestmentLifeInsuranceQuote, Cypress.env('username'), Cypress.env('password'), Cypress.env('identityServerUrl'));
        });
    });

    beforeEach(function () {
        testLibs.menu.navigateToAddInvestmentLifeInsuranceQuote();
    });

    it('Create - Investment Life Insurance Quote', function () {

        testLibs.contract.actorDropdown.openDropdownMenu();
        testLibs.contract.actorDropdown.changeActor(commonTestData.actorOperations);

        // Select partner -->
        testLibs.contract.partnerLookup.open();
        testLibs.contract.serviceProviderFreeTextInput.setValue(body.mainInsuranceConditions?.partner?.partnerBusinessCode);
        testLibs.contract.serviceProviderFreeTextInput.checkValue(body.mainInsuranceConditions?.partner?.partnerBusinessCode);
        testLibs.contract.searchViewSearchButton.click();
        cy.wait(500);
        testLibs.contract.serviceProviderSearchResultTable.selectTableRowByValue(body.mainInsuranceConditions?.partner?.partnerBusinessCode);
        testLibs.contract.lookupDialogConfirmButton.click();
        cy.wait(500);
        // <-- Select partner

        // Select insurance product -->
        testLibs.contract.insuranceProductDropdown.select(body.mainInsuranceConditions?.insuranceProduct?.productDescription);
        cy.wait(500);
        // <-- Select insurance product

        testLibs.contract.basicConditions.toggle();
        if (testLibs.contract.basicConditions.isCollapsed()) {
            testLibs.contract.basicConditions.toggle();
        }
        const applicationDate = DateTimeUtils.formatDate(body.basicConditions?.applicationDate, DateTimeUtils.DateFormats.CALENDAR);
        testLibs.contract.applicationDate.setValue(applicationDate);
        testLibs.contract.applicationDate.checkValue(applicationDate);

        const receiptDate = DateTimeUtils.formatDate(body.basicConditions?.receiptDate, DateTimeUtils.DateFormats.CALENDAR);
        testLibs.contract.receiptDate.setValue(receiptDate);
        testLibs.contract.receiptDate.checkValue(receiptDate);

        const acceptToWorkDate = DateTimeUtils.formatDate(body.basicConditions?.acceptToWorkDate, DateTimeUtils.DateFormats.CALENDAR);
        testLibs.contract.acceptToWorkDate.setValue(acceptToWorkDate);
        testLibs.contract.acceptToWorkDate.checkValue(acceptToWorkDate);

        const issueDate = DateTimeUtils.formatDate(body.basicConditions?.issueDate, DateTimeUtils.DateFormats.CALENDAR);
        testLibs.contract.issueDate.setValue(issueDate);
        testLibs.contract.issueDate.checkValue(issueDate);

        const riskPremium = body.basicConditions?.riskPremium;
        testLibs.contract.riskPremiumInput.setValue(riskPremium);
        // testLibs.contract.riskPremiumInput.checkValue(riskPremium);

        // Change tab to Participants -->
        testLibs.contract.tabLayout.switchToTab(commonFixtures.contractSelectors.tabParticipants);
        testLibs.contract.tabLayout.isTab(commonFixtures.contractSelectors.tabParticipants);
        // <-- Change tab to Participants

        testLibs.contract.policyHolderLookUpSearch.open();
        testLibs.contract.generalPartyFreeTextInput.setValue(body.policyHolder?.partyData?.partyFullName);
        testLibs.contract.generalPartyFreeTextInput.checkValue(body.policyHolder?.partyData?.partyFullName);
        testLibs.contract.searchViewPartySearchButton.click();
        cy.wait(500);
        testLibs.contract.generalPartySearchTable.selectTableRowByValue(body.policyHolder?.partyData?.partyFullName);
        testLibs.contract.lookupDialogConfirmButton.click();
        cy.wait(500);

        testLibs.contract.insuredPersonLookUpSearch.open();
        testLibs.contract.generalPartyFreeTextInput.setValue(body.insuredPerson?.partyData?.partyFullName);
        testLibs.contract.generalPartyFreeTextInput.checkValue(body.insuredPerson?.partyData?.partyFullName);
        testLibs.contract.searchViewPartySearchButton.click();
        cy.wait(500);
        testLibs.contract.generalPartySearchTable.selectTableRowByValue(body.insuredPerson?.partyData?.partyFullName);
        testLibs.contract.lookupDialogConfirmButton.click();
        cy.wait(500);

        testLibs.contract.beneficiaries.toggle();
        if (testLibs.contract.beneficiaries.isCollapsed()) {
            testLibs.contract.beneficiaries.toggle();
        }
        testLibs.contract.beneficiariesIsHeritorsCheckbox.setValue();
        cy.wait(500);
        testLibs.contract.beneficiariesIsHeritorsCheckbox.checkValue(true);

        testLibs.contract.medicalQuestionsIsConfirmedCheckbox.setValue();
        cy.wait(500);
        testLibs.contract.medicalQuestionsIsConfirmedCheckbox.checkValue(true);

        testLibs.contract.declarationMainIsConfirmedPolicyHolder.setValue();
        cy.wait(500);
        testLibs.contract.declarationMainIsConfirmedPolicyHolder.checkValue(true);

        testLibs.contract.declarationMainIsConfirmedInsuredPerson.setValue();
        cy.wait(500);
        testLibs.contract.declarationMainIsConfirmedInsuredPerson.checkValue(true);

        // Change tab to Additional conditions -->
        testLibs.contract.tabLayout.switchToTab(commonFixtures.contractSelectors.tabAdditionalConditions);
        testLibs.contract.tabLayout.isTab(commonFixtures.contractSelectors.tabAdditionalConditions);
        // <-- Change tab to Additional conditions -->

        // Select initiator -->
        testLibs.contract.initiatorLookup.open();
        testLibs.contract.serviceProviderFreeTextInput.setValue(body.initiator?.userName);
        testLibs.contract.serviceProviderFreeTextInput.checkValue(body.initiator?.userName);
        testLibs.contract.searchViewSearchButton.click();
        cy.wait(500);
        testLibs.contract.serviceProviderSearchResultTable.selectTableRowByValue(body.initiator?.userName);
        testLibs.contract.lookupDialogConfirmButton.click();
        cy.wait(500);
        // <-- Select initiator

        testLibs.contract.footer.save();
        cy.wait(3000);
        cy.url().should('include', `documentNumber=`);

        testLibs.contract.transitionsActions.openDropdownMenu();
        cy.contains(commonTestData.createPolicy).click();

        testLibs.contract.confirmationDialog.exists(true);
        testLibs.contract.confirmationDialog.verifyMessage(commonTestData.doYouWantToCreatePolicy);
        testLibs.contract.confirmationDialog.ok();

        cy.wait(3000);
        cy.url().should('include', `Policy`);
        cy.url().should('include', `documentNumber=`);
        testLibs.contract.documentTitleOutputText.checkValueContaining(commonTestData.investmentPolicy);
        testLibs.contract.documentStateOutputText.checkValueContaining(commonTestData.policyStateDraft);

        testLibs.contract.transitionsActions.openDropdownMenu();
        cy.contains(commonTestData.draftToActivePolicy).click();

        testLibs.contract.confirmationDialog.exists(true);
        testLibs.contract.confirmationDialog.verifyMessage(commonTestData.doYouWantToActivePolicy);
        testLibs.contract.confirmationDialog.ok();
        testLibs.contract.documentStateOutputText.checkValueContaining(commonTestData.policyStateActive);

        testLibs.contract.actorDropdown.openDropdownMenu();
        testLibs.contract.actorDropdown.changeActor(commonTestData.actorSystem);

        testLibs.contract.transitionsActions.openDropdownMenu();
        cy.contains(commonTestData.activeToActivatedPolicy).click();

        testLibs.contract.confirmationDialog.exists(true);
        testLibs.contract.confirmationDialog.verifyMessage(commonTestData.doYouWantToActivatedPolicy);
        testLibs.contract.confirmationDialog.ok();
        testLibs.contract.documentStateOutputText.checkValueContaining(commonTestData.policyStateActivated);

        // testLibs.contract.header.logOut();

    });

});
