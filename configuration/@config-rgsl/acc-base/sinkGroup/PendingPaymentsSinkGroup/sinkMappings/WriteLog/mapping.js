'use strict';

const { LocalDateTime } = require('@js-joda/core');

module.exports = function mapping(input, sinkExchange) {
    const postResult = sinkExchange.resolveContext('postResult');

    let items;

    if (postResult.postedIds && postResult.postedIds.length > 0) {
        items = postResult.postedIds.map(_ => ({
            ETL_EXECUTION_STATUS_ID: this.businessContext.executionStatusId,
            DOCUMENT_NO: input.documentNo,
            MATCHING_ID: _,
            DATE_TIME: LocalDateTime.now().toString(),
            ERROR_MESSAGE: postResult.errorMessage,
        }));
    }
    else {
        items = [{
            ETL_EXECUTION_STATUS_ID: this.businessContext.executionStatusId,
            DOCUMENT_NO: input.documentNo,
            DATE_TIME: LocalDateTime.now().toString(),
            ERROR_MESSAGE: postResult.errorMessage,
        }];
    }

    return {
        'ACC_IMPL.PENDING_PAYMENT_ETL_LOG': items,
    };
};
