'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.enrichedBody = sinkResult.enrichedBody;
};
