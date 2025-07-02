'use strict';

module.exports = function ({input, sinkExchange, additionalDataSources}) {

    const affectedCount = sinkExchange.resolveContext('affectedCount');

    const successResponse = {
        code: 'OK',
        message: 'Items deleted!',
        affectedCount: affectedCount,
    };

    return successResponse;
};
