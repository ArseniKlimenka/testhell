const { countryRussia } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function residentChanged(input) {

    input.data.registrationCountry = {};

    if (input.data.isNonResident) {

        input.data.taxResidence = undefined;
        input.data.TIN = undefined;
        input.data.noTIN = false;

    }
    else {

        input.data.registrationCountry = countryRussia;
        input.data.TIN = undefined;
        input.data.noTIN = false;

    }

    this.view.reevaluateRules();
    this.view.validate();

};
