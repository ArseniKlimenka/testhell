module.exports = function resultMapping(input) {
    const result = {
        applicationUserId: input.APPLICATION_USER_ID,
        externalId: input.EXTERNAL_ID,
    };

    return result;
};
