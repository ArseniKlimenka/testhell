const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function isEditOfLegalEntity(input) {
    return input.context.viewContext.editPartyConfiguration === partyType.LegalEntity;
};
