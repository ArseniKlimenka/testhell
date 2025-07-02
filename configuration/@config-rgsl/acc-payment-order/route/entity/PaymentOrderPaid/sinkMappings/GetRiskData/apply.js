'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const risksData = sinkResult.data.map(r => r.resultData);
    sinkExchange.mapContext('risksData', risksData);
};
