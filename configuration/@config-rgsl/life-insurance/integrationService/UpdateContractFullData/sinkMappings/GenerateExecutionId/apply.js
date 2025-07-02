'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.mapContext('executionId', sinkResult.sequenceNumber);
};
