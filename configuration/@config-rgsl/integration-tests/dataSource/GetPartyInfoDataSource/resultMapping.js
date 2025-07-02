module.exports = function resultMapping(input) {

    return {
        partyId: input.PARTY_ID,
        partyCode: input.PARTY_CODE,
        partyBody: JSON.parse(input.BODY)
    };
};

