'use strict';

module.exports = function ({input, sinkExchange, additionalDataSources}) {
    const ppItems = sinkExchange.resolveContext('ppItems');

    const successResponse = {
        code: 'OK',
        message: 'Autopopulation finished!',
        newCount: ppItems.length,
    };

    return successResponse;
};
