module.exports = function resultMapping(input) {
    return {
        username: input.USERNAME,
        createDate: input.CREATE_DATE,
        oldState: input.OLD_STATE,
        newState: input.NEW_STATE,
    };
};
