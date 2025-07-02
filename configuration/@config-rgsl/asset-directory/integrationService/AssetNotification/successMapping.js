'use strict';
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping({ input, sinkExchange, additionalDataSources }) {

    const successResponse = {
        status: sinkExchange.status,
        errorCode: sinkExchange.errorCode,
        calculationDate: dateUtils.dateTimeNow(),
    };

    return successResponse;
};
