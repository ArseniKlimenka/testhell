const { updateAmendmentBeneficiaryData } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');

module.exports = async function recipientPartyResultMapping(input, ambientProperties) {

    const lookupSelection = input.getLookupSelection();
    const partyData = input.data?.partyData;

    await updateAmendmentBeneficiaryData(input, ambientProperties, this);

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const selected = lookupSelection[0];

        partyData.partyCode = selected.metadata.code;
        partyData.partyFullName = selected.resultData.fullName;
    }
};
