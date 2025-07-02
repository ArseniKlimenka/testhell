'use strict';

module.exports = function mapping({input, sinkExchange, additionalDataSources}) {

    const docs = sinkExchange.resolveContext('transitionResponses') || [];

    const successResponse = {
        claimDocuments: docs
    };

    return successResponse;
};
