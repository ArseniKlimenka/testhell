'use strict';
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function resultMapping(sinkInput, sinkExchange) {

    const successResponse = {
        status: sinkExchange.status,
        errorCode: sinkExchange.errorCode,
        result: sinkExchange.result,
        calculationDate: dateUtils.dateTimeNow(),
        amendmentNumber: sinkExchange.amendmentNumber,
        budgetRuleCode: sinkExchange.budgetRuleCode,
        budgetRuleName: sinkExchange.budgetRuleName,
        budgetAlgorithmCode: sinkExchange.budgetAlgorithmCode,
        budgetAlgorithmName: sinkExchange.budgetAlgorithmName,
    };

    return successResponse;
};
