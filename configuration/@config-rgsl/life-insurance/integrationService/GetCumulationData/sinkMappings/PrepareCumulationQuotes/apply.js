'use strict';

module.exports = function applyData(sinkResult, sinkInput, sinkExchange) {

    let cumulationQuotes = [];

    if (sinkResult && sinkResult.data && sinkResult.data.length > 0) {
        cumulationQuotes = sinkResult.data.map(i => i.resultData.contractNumber);
    }

    sinkExchange.cumulationQuotes = cumulationQuotes;
};
