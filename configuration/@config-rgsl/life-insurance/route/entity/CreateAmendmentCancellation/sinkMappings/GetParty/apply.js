"use strict";

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult?.data?.length === 0) {

        return;
    }

    const party = sinkResult.data[0].resultData;

    let bankAccounts = party.body.partyBankAccounts ?? [];
    bankAccounts = bankAccounts.filter(a => !a.closingDate);

    sinkExchange.partyData = {
        partyId: party.partyId,
        partyCode: party.partyCode,
        partyType: party.partyType,
        partyFullName: party.commonBody.fullName,
        partyBody: party.body,
        dateOfBirth: party.body.partyPersonData?.dateOfBirth,
        personGender: party.body.partyPersonData?.personGender,
        bankAccounts: bankAccounts,
    };
};
