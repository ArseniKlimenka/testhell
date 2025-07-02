'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const mainRisks = sinkResult.data.map(r => r.resultData);
    sinkExchange.mapContext('mainRisks', mainRisks);
};
