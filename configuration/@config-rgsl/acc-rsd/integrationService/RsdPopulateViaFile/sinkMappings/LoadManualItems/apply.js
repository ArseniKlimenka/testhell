'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const manualItems = sinkResult.data.map(r => r.resultData);
    sinkExchange.mapContext('manualItems', manualItems);
};
