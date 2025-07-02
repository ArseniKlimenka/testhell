const { executivePersonNoPublicOfficial } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function isPublicOfficialChanged(input) {

    input.data.executivePerson = {};

    if (input.data.isPublicOfficial) {

        input.data.executivePerson = undefined;

    }
    else {

        input.data.executivePerson = executivePersonNoPublicOfficial;

    }

    this.view.validate();
    this.view.reevaluateRules();

};
