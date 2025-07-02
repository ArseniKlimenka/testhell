'use strict';

module.exports = function mapping({input, sinkExchange, additionalDataSources}) {

    const docs = sinkExchange.resolveContext('transitionResponses') ?? [];

    const successResponse = {
        endowments: docs
    };

    return successResponse;
};
