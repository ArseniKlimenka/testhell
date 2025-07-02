'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    sinkExchange.status = sinkResult.status;
    sinkExchange.errorCode = sinkResult.errorCode;
    sinkExchange.result = sinkResult.result;
    sinkExchange.amendmentNumber = sinkResult.amendmentNumber;
    sinkExchange.budgetRuleCode = sinkResult.budgetRuleCode;
    sinkExchange.budgetRuleName = sinkResult.budgetRuleName;
    sinkExchange.budgetAlgorithmCode = sinkResult.budgetAlgorithmCode;
    sinkExchange.budgetAlgorithmName = sinkResult.budgetAlgorithmName;
};
