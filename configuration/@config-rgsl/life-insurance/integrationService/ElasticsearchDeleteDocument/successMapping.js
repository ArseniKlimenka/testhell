'use strict';

module.exports = function mapping({ input, sinkExchange, additionalDataSources }) {

    const successResponse = {
        code: 'OK',
        message: `Document was deleted from Elasticsearch`
    };

    return successResponse;
};
