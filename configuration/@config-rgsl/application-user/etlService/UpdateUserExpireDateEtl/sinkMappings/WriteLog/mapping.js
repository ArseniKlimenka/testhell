'use strict';

const { LocalDateTime } = require('@js-joda/core');

module.exports = function mapping(input, sinkExchange) {

    const items = [{
        ETL_EXECUTION_STATUS_ID: this.businessContext.executionStatusId,
        APPLICATION_USER_ID: input.applicationUserId,
        LOAD_DATE: LocalDateTime.now().toString(),
        NEW_EXPIRE_DATE: input.aaEndDate,
    }];

    return {
        'ORG_IMPL.UPDATE_USER_EXP_DATE_ETL_LOG': items,
    };
};
