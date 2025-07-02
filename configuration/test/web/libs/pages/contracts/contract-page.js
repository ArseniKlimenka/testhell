/* eslint-disable import/no-unresolved */
/* eslint-disable spaced-comment */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable promise/no-nesting */
// eslint-disable-next-line import/no-unresolved
/// <reference types="cypress" />
const commands = require('../../../../../../web-test-framework');
const commonFixtures = require('../../../fixtures');

/**
 * Contract Page.
 */
class ContractPage {

    constructor(selectors) {

        this.url = new commands.Url();
        this.tabLayout = new commands.Tabs(selectors.tabLayout);
        this.infoControl = new commands.OutputText(selectors.infoControl);
        this.documentTitleOutputText = new commands.OutputText(selectors.documentTitleOutputText);
        this.documentStateOutputText = new commands.OutputText(selectors.documentStateOutputText);

        this.adInsureSettings = new commands.Button(selectors.adInsureSettings);
        this.actorDropdown = new commands.Actor(selectors.actorDropdown);

        // Select partner -->
        this.partnerLookup = new commands.Lookup(selectors.partnerLookup);
        this.serviceProviderFreeTextInput = new commands.TextInput(selectors.serviceProviderFreeTextInput);
        this.searchViewSearchButton = new commands.Button(selectors.searchViewSearchButton);
        this.serviceProviderSearchResultTable = new commands.Table(selectors.serviceProviderSearchResultTable);
        this.lookupDialogConfirmButton = new commands.Button(selectors.lookupDialogConfirmButton);
        // <-- Select partner

        // Select insurance product -->
        this.insuranceProductDropdown = new commands.Dropdown(selectors.insuranceProductDropdown);
        // <-- Select insurance product

        this.basicConditions = new commands.Section(selectors.basicConditions);
        this.applicationDate = new commands.DatetimePicker(selectors.applicationDate);
        this.receiptDate = new commands.DatetimePicker(selectors.receiptDate);
        this.acceptToWorkDate = new commands.DatetimePicker(selectors.acceptToWorkDate);
        this.issueDate = new commands.DatetimePicker(selectors.issueDate);

        this.riskPremiumInput = new commands.TextInput(selectors.riskPremiumInput);

        this.policyHolderLookUpSearch = new commands.Lookup(selectors.policyHolderLookUpSearch);
        this.generalPartyFreeTextInput = new commands.TextInput(selectors.generalPartyFreeTextInput);
        this.searchViewPartySearchButton = new commands.Button(selectors.searchViewPartySearchButton);
        this.generalPartySearchTable = new commands.Table(selectors.generalPartySearchTable);

        this.insuredPersonLookUpSearch = new commands.Lookup(selectors.insuredPersonLookUpSearch);

        this.beneficiaries = new commands.Section(selectors.beneficiaries);
        this.beneficiariesIsHeritorsCheckbox = new commands.CheckBoxInput(selectors.beneficiariesIsHeritorsCheckbox);
        this.medicalQuestionsIsConfirmedCheckbox = new commands.CheckBoxInput(selectors.medicalQuestionsIsConfirmedCheckbox);
        this.declarationMainIsConfirmedPolicyHolder = new commands.CheckBoxInput(selectors.declarationMainIsConfirmedPolicyHolder);
        this.declarationMainIsConfirmedInsuredPerson = new commands.CheckBoxInput(selectors.declarationMainIsConfirmedInsuredPerson);

        this.initiatorLookup = new commands.Lookup(selectors.initiatorLookup);

        this.transitionsActions = new commands.Actions(selectors.transitionsDropdown);
        this.createPolicyButton = new commands.Button(selectors.createPolicyButton);

        this.confirmationDialog = new commands.PopUp(selectors.confirmationDialog);

        this.overlay = new commands.Overlay();
        this.spinner = new commands.Spinner();
        this.footer = new commands.Footer();
        this.header = new commands.Header();

        this.selectorsPaths = selectors;

    }
}

module.exports = new ContractPage(commonFixtures.contractSelectors);
