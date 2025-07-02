'use strict';

module.exports = function applyData(sinkResult, sinkInput, sinkExchange) {

    let cumulationPolicies = [];

    if (sinkResult && sinkResult.data && sinkResult.data.length > 0) {
        cumulationPolicies = sinkResult.data.map(i => i.resultData);
    }

    sinkExchange.cumulationContracts.push(...cumulationPolicies);
    sinkExchange.contractsRiskCodes = [...new Set(sinkExchange.cumulationContracts.map(i => i.riskCode))];
};
