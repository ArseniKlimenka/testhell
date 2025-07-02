'use strict';

module.exports = function mapping({input, sinkExchange, additionalDataSources}) {

    const successResponse = {
        code: 'OK',
        message: 'Job was done!',
        itemCountCreated: sinkExchange.resolveContext('itemCountCreated'),
    };

    return successResponse;
};
