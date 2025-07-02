'use strict';
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping({ input, sinkExchange, additionalDataSources }) {

    const successResponse = {
        status: sinkExchange.status,
        errorCode: sinkExchange.errorCode,
        result: sinkExchange.result,
        calculationDate: dateUtils.dateTimeNow(),
        amendmentNumber: sinkExchange.amendmentNumber
    };

    if (sinkExchange.budgetRuleCode && sinkExchange.budgetRuleName) {

        successResponse.budgetRule = {
            code: sinkExchange.budgetRuleCode,
            name: sinkExchange.budgetRuleName
        };
    }

    if (sinkExchange.budgetAlgorithmCode && sinkExchange.budgetAlgorithmName) {

        successResponse.budgetRuleAlgorithm = {
            code: sinkExchange.budgetAlgorithmCode,
            name: sinkExchange.budgetAlgorithmName
        };
    }

    return successResponse;
};
