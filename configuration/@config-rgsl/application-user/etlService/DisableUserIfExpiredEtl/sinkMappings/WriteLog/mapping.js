'use strict';

const { LocalDateTime } = require('@js-joda/core');

module.exports = function mapping(input, sinkExchange) {

    const items = [{
        ETL_EXECUTION_STATUS_ID: this.businessContext.executionStatusId,
        APPLICATION_USER_ID: input.applicationUserId,
        LOAD_DATE: LocalDateTime.now().toString(),
    }];

    return {
        'ORG_IMPL.DISABLE_USER_IF_EXPIRED_ETL_LOG': items,
    };
};
