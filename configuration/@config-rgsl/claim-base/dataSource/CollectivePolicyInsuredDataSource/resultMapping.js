module.exports = function resultMapping(input) {

    return {
        partyCode: input.PARTY_CODE,
        fullName: `${input.SURNAME} ${input.FIRST_NAME} ${input.MIDDLE_NAME}`
    };
};
