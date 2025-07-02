module.exports = function mapping(input, sinkExchange) {

    const activityExists = sinkExchange.resolveContext('activityExists');
    if (activityExists) {
        return;
    }

    const item = {
        ETL_EXECUTION_STATUS_ID: this.businessContext.executionStatusId,
        ACTIVITY_ID: input.activityId,
    };

    return {
        'BFX_IMPL.FIND_ABSENT_ACTIVITIES': [item]
    };
};
