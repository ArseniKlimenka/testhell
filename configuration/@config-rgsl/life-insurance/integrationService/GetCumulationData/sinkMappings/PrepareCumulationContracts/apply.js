'use strict';

module.exports = function applyData(sinkResult, sinkInput, sinkExchange) {

    let cumulationPolicies = [];

    if (sinkResult && sinkResult.data && sinkResult.data.length > 0) {
        cumulationPolicies = sinkResult.data.map(i => i.resultData.contractNumber);
    }

    sinkExchange.cumulationPolicies = cumulationPolicies;

    if (sinkExchange.cumulationQuotes.length == 0 && sinkExchange.cumulationPolicies.length == 0) {
        this.stopExecution("Котировки и договоры для кумуляции не найдены.");
    }
};
