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
 * Legal Entity Page.
 */
class LegalEntityPage {

    constructor(selectors) {

        this.url = new commands.Url();
        this.tabsMain = new commands.Tabs(selectors.page);
        this.infoControl = new commands.OutputText(selectors.infoControl);

        this.fullOrgName = new commands.TextInput(selectors.generalInformation + ' ' + selectors.fullOrgName);
        this.shortOrgName = new commands.TextInput(selectors.generalInformation + ' ' + selectors.shortOrgName);
        this.OGRNOGRNIP = new commands.TextInput(selectors.generalInformation + ' ' + selectors.PartyOGRN + ' ' + selectors.OGRNOGRNIP);
        this.dateOfStateRegistrationInput = new commands.DatetimePicker(selectors.generalInformation + ' ' + selectors.PartyOGRN + ' ' + selectors.dateOfStateRegistration);
        this.registrationAgencyCode = new commands.Dropdown(selectors.generalInformation + ' ' + selectors.PartyOGRN + ' ' + selectors.registrationAgencyCode);
        this.INNKIO = new commands.TextInput(selectors.partyGeneralData + ' ' + selectors.INNKIO);

        this.overlay = new commands.Overlay();
        this.spinner = new commands.Spinner();
        this.footer = new commands.Footer();
        this.header = new commands.Header();

        this.selectorsPaths = selectors;

    }
}

module.exports = new LegalEntityPage(commonFixtures.legalEntitySelectors);
