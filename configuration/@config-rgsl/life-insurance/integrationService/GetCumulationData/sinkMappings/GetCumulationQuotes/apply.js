'use strict';

module.exports = function applyData(sinkResult, sinkInput, sinkExchange) {

    let cumulationQuotes = [];

    if (sinkResult && sinkResult.data && sinkResult.data.length > 0) {
        cumulationQuotes = sinkResult.data.map(i => i.resultData);
    }

    sinkExchange.cumulationContracts.push(...cumulationQuotes);
};
