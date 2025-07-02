module.exports = function resultMapping(input) {
    const output = {
        userId: input.APPLICATION_USER_ID,
        username: input.USERNAME,
        partyCode: input.PARTY_CODE,
        displayName: input.DISPLAY_NAME,
        expireDate: input.EXPIRE_DATE,
    };

    return output;
};
