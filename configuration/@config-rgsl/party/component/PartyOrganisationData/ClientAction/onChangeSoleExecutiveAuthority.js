const { countryRussia } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function onChangeSoleExecutiveAuthority(input) {

    input.data.soleExecutiveAuthority = {};

    this.view.reevaluateRules();
    this.view.validate();

};
