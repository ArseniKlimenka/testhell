'use strict';

module.exports = function ({input, sinkExchange, additionalDataSources}) {

    const affectedCount = sinkExchange.resolveContext('affectedCount');

    const successResponse = {
        code: 'OK',
        message: 'Items updated!',
        affectedCount: affectedCount,
    };

    return successResponse;
};
