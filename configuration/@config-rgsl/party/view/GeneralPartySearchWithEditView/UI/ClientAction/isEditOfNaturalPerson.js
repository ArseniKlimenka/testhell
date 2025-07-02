const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function isEditOfNaturalPerson(input) {
    return input.context.viewContext.editPartyConfiguration === partyType.NaturalPerson;
};
