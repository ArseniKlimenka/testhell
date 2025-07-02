const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function policyHolderNaturalPersonShow(input, ambientProperties) {

    const policyHolderPartyType = getValue(input, 'context.Body.policyHolder.partyData.partyType');

    if (policyHolderPartyType == partyType.NaturalPerson)
    { return true; }
    return false;

};
