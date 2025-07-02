'use strict';

module.exports = function applyData(input, dataSourceResponse) {

    if (dataSourceResponse?.data?.length === 0) {

        return;
    }

    const party = dataSourceResponse.data[0].resultData;

    input.partyFullName = (party.commonBody && party.commonBody.fullName) ? party.commonBody.fullName : undefined;
    input.partyBody = party.body ? party.body : {};
    input.dateOfBirth = party.body?.partyPersonData?.dateOfBirth;
    input.personGender = party.body?.partyPersonData?.personGender;
};

