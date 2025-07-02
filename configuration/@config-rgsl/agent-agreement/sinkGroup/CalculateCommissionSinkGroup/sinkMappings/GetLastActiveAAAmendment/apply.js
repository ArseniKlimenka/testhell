'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.amendmentNumber = sinkResult.data[0].resultData.amendmentNumber;
    sinkExchange.budgetRuleCode = sinkResult.data[0].resultData.budgetRuleCode;
    sinkExchange.budgetRuleName = sinkResult.data[0].resultData.budgetRuleName;
    sinkExchange.budgetAlgorithmCode = sinkResult.data[0].resultData.budgetAlgorithmCode;
    sinkExchange.budgetAlgorithmName = sinkResult.data[0].resultData.budgetAlgorithmName;
};
