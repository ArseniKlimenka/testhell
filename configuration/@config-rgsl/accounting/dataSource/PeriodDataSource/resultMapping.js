module.exports = function resultMapping(input) {

    return {
        periodId: input.PERIOD_ID,
        periodStatusId: input.PERIOD_STATUS_ID,
        periodTypeId: input.PERIOD_TYPE_ID,
        description: input.DESCRIPTION,
        startDate: input.START_DATE,
        endDate: input.END_DATE,
        lastUpdated: input.LAST_UPDATED,
        username: input.USERNAME,
    };
};
