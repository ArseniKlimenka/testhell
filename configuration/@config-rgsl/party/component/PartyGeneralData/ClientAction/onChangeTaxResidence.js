'use strict';

const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');
const { countryRussia } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function onChangeTaxResidence(input) {

    const partyGeneralData = input.componentContext;

    const isCRSTaxResidenceExists = partyValidationHelper.isCRSTaxResidenceExists(partyGeneralData);
    const isFATCATaxResidenceExists = partyValidationHelper.isFATCATaxResidenceExists(partyGeneralData);

    if (!isCRSTaxResidenceExists) {

        if (input.context.Body.data) {
            input.context.Body.data.partyCRS = {};
        } else {
            input.context.Body.partyCRS = {};
        }
    }

    if (!isFATCATaxResidenceExists) {

        if (input.context.Body.data) {
            input.context.Body.data.partyFatca = {};
        } else {
            input.context.Body.partyFatca = {};
        }
    }

    const taxResidence = input?.rootContext?.Body?.partyGeneralData?.taxResidence;

    if (taxResidence?.countryCode == countryRussia.countryCode) {

        input.data.isNonResident = false;
        input.data.registrationCountry = taxResidence;
        this.view.reevaluateRules();
    }

    this.view.reevaluateRules();
    this.view.validate();

};
