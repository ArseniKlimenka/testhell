'use strict';

module.exports = function mapping({ input, sinkExchange, additionalDataSources }) {

    const successResponse = {
        status: sinkExchange.status,
        errorCode: sinkExchange.errorCode
    };

    return successResponse;
};
