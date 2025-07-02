module.exports = async function duplicatePartyResultMapping(input, ambientProperties) {

    const lookupSelection = input.getLookupSelection();
    const body = input.context.Body;
    body.duplicateParty = body.duplicateParty || {};

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const selected = lookupSelection[0];
        body.duplicateParty.partyId = selected.metadata.entityId;
        body.duplicateParty.partyCode = selected.metadata.code;
        body.duplicateParty.partyType = selected.metadata.configurationName;
        body.duplicateParty.partyFullName = selected.resultData.fullName;
        body.duplicateParty.body = selected.resultData;

    }

};
