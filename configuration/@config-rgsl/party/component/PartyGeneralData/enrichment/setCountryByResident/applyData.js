'use strict';

const { countryRussia } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function applyData(partyGeneralData) {

    if (!partyGeneralData.isNonResident) {
        partyGeneralData.registrationCountry = countryRussia;
        partyGeneralData.TIN = undefined;
    }

};
