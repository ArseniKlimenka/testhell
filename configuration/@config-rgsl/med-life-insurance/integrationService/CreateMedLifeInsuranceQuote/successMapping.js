'use strict';

module.exports = function mapping({ input, sinkExchange, additionalDataSources }) {

    const successResponse = {
        code: 'OK',
        message: 'Med life insurance quote successfully created',
        createdQuote: sinkExchange.createdQuote
    };

    return successResponse;
};
