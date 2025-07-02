const { countryRussia } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function checkDefaultResident(input) {

    if (input.data.registrationCountry && input.data.registrationCountry.countryCode == countryRussia.countryCode) {
        input.data.TIN = undefined;
        this.view.reevaluateRules();
    }
    else {
        input.data.isNonResident = true;
    }

};
