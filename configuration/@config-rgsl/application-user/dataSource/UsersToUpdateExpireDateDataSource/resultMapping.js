module.exports = function resultMapping(input) {
    const result = {
        applicationUserId: input.APPLICATION_USER_ID,
        externalId: input.EXTERNAL_ID,
        expireDate: input.EXPIRE_DATE,
        aaEndDate: input.AA_END_DATE,
    };

    return result;
};
