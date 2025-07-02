const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function showRegistrationAgency(input) {

    const confName = input.context.ConfigurationCodeName;

    return confName === partyType.LegalEntity ||
        confName === 'LegalEntityBasicEdit';
};
