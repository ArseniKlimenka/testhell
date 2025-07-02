'use strict';

module.exports = function mapping({input, sinkExchange, additionalDataSources}) {

    const message = sinkExchange.resolveContext('message');

    const successResponse = {
        code: 'OK',
        message: message
    };

    return successResponse;
};
