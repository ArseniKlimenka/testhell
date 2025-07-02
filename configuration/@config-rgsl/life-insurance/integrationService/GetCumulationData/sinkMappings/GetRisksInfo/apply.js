'use strict';

module.exports = function applyData(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult && sinkResult.data && sinkResult.data.length > 0) {
        sinkExchange.riskCodesInfo = sinkResult.data.map(i => i.resultData);
    }
};
