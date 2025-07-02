'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const phData = sinkResult.data.map(r => r.resultData);
    sinkExchange.mapContext('phData', phData[0]);
};
