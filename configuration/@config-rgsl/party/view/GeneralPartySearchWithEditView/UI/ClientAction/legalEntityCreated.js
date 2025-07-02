const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function legalEntityCreated(input) {
    // map created party to the lookup selection to enable select button
    input.data.selection = [prepareLegalEntitySelectionData(input.actionData)];
};

function prepareLegalEntitySelectionData(data) {
    const body = data.Body ?? data.data;

    const fullName = body?.partyOrganisationData?.fullOrgName;
    const OGRNOGRNIP = body?.partyOrganisationData?.partyOGRN.OGRNOGRNIP;

    return {
        metadata: {
            entityId: data.Id,
            code: data.Code,
            description: data.Code,
            configurationName: partyType.LegalEntity
        },
        resultData: {
            fullName: fullName,
            code: data.Code,
            OGRNOGRNIP: OGRNOGRNIP
        }
    };
}
