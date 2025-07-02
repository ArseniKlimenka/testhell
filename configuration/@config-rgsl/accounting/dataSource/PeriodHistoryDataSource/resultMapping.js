module.exports = function resultMapping(input) {
    return {
        createDate: input.CREATE_DATE,
        periodStatusId: input.PERIOD_STATUS_ID_TO,
        username: input.USERNAME,
    };
};
