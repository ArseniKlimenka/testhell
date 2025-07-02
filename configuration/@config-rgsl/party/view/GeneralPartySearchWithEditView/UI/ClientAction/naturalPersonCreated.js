const { partyType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function naturalPersonCreated(input) {
    // map created party to the lookup selection to enable select button
    input.data.selection.push(prepareNaturalPersonSelectionData(input.actionData));
};

function prepareNaturalPersonSelectionData(data) {
    const body = data.Body ?? data.data;

    const lastName = body?.partyPersonData?.lastName;
    const firstName = body?.partyPersonData?.firstName;
    const middleName = body?.partyPersonData?.middleName || '';
    const fullName = `${lastName} ${firstName}${middleName ? ' ' + middleName : ''}`;
    const dateOfBirth = body?.partyPersonData?.dateOfBirth;

    return {
        metadata: {
            entityId: data.Id,
            code: data.Code,
            description: data.Code,
            configurationName: partyType.NaturalPerson
        },
        resultData: {
            fullName: fullName,
            dateOfBirth: dateOfBirth,
            code: data.Code
        }
    };
}
