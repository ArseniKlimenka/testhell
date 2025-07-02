module.exports = async function masterPartyResultMapping(input, ambientProperties) {

    const lookupSelection = input.getLookupSelection();
    const body = input.context.Body;
    body.masterParty = body.masterParty || {};

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const selected = lookupSelection[0];
        body.masterParty.partyId = selected.metadata.entityId;
        body.masterParty.partyCode = selected.metadata.code;
        body.masterParty.partyType = selected.metadata.configurationName;
        body.masterParty.partyFullName = selected.resultData.fullName;
        body.masterParty.body = selected.resultData;

    }

};
