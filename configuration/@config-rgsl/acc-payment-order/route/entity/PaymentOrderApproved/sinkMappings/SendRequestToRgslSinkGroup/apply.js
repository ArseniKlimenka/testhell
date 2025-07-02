'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    sinkExchange.mapContext('sendToPaid', sinkResult.shouldSendToPaid);
};
