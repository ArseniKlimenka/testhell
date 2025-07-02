'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const aaData = sinkResult.data.map(r => r.resultData);
    sinkExchange.mapContext('aaData', aaData);
};
