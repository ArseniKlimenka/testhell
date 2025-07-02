const { updateAmendmentBeneficiaryData } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');

module.exports = async function partyResultMapping(input, ambientProperties) {

    const lookupSelection = input.getLookupSelection();
    const body = input.context.Body;
    const partyData = body.applicant?.partyData;

    await updateAmendmentBeneficiaryData(input, ambientProperties, this);

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const selected = lookupSelection[0];

        partyData.partyId = selected.metadata.entityId;
        partyData.partyCode = selected.metadata.code;
        partyData.partyType = selected.metadata.configurationName;
        partyData.partyFullName = selected.resultData.fullName;
    }
};
