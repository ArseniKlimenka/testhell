'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    sinkExchange.mapContext('executionId', sinkResult.sequenceNumber);
};
