const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function showDateOfRecordingTermination(input) {

    const confName = input.context.ConfigurationCodeName;

    return confName === partyType.LegalEntity ||
        confName === 'LegalEntityBasicEdit';
};
