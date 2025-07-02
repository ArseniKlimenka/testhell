'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.recommendedStrategies = sinkResult.data.map(data => data.resultData);

};
