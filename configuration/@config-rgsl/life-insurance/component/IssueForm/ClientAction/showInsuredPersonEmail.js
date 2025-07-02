const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function showInsuredPersonEmail(input) {

    const body = input.rootContext.Body;
    const issueFormCode = input.data?.code?.issueFormCode;
    const policyHolderPartyType = body.policyHolder?.partyData?.partyType;
    const isPaper = issueFormCode == lifeInsuranceConstants.issueForm.paper.issueFormCode;

    if (isPaper)
    { return false; }

    if (policyHolderPartyType == partyConstants.partyType.LegalEntity)
    { return true; }

    return false;
};
