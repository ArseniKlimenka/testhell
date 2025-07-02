const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function isNaturalPerson(input) {

    return input.context.ConfigurationCodeName === partyConstants.partyType.NaturalPerson;
};
