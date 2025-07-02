module.exports = function resultMapping(input) {
    const result = {
        applicationUserId: input.APPLICATION_USER_ID,
        username: input.USERNAME,
        email: input.EMAIL,
        expireDate: input.EXPIRE_DATE,
    };

    return result;
};
