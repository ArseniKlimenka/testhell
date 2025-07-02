'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    const responses = sinkExchange.resolveContext('transitionResponses') || [];

    const response = {
        claimNumber: sinkInput.businessNumber,
        isStatusChanged: sinkResult.hasTransitioned
    };

    responses.push(response);

    sinkExchange.mapContext('transitionResponses', responses);
};
