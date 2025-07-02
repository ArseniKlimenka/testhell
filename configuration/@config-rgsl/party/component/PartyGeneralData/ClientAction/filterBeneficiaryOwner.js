const { generalData, partyType, viewType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function filterBeneficiaryOwner(input) {

    if (input.items && input.items.length > 0
        && (input.context.ConfigurationCodeName === partyType.NaturalPerson
        || input.context.ConfigurationCodeName === viewType.NaturalPerson)) {
        return input.items.filter(data => data.beneficiaryOwnerCode === generalData.beneficiarItSelfCode);
    } else if (input.items && input.items.length > 0 && input.context.ConfigurationCodeName !== partyType.NaturalPerson) {
        return input.items.filter(data => data.beneficiaryOwnerCode !== generalData.beneficiarItSelfCode);
    }

};
