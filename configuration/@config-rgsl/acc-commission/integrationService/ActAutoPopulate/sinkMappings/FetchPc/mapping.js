'use strict';

module.exports = function (sinkInput, sinkExchange) {
    const act = sinkExchange.resolveContext('act');

    return {
        input: {
            data: {
                criteria: {
                    actNo: act.actNo,
                    isDocCorrect: act.isDocCorrect,
                    agentServiceProviderCode: act.aaServiceProviderCode,
                    agentAgreementNumber: act.aaNumber,
                    referenceNumbers: sinkInput.referenceNumbers,
                    productGroupInclude: act.productGroupInclude,
                    productsInclude: act.productsInclude,
                    productGroupExclude: act.productGroupExclude,
                    productsExclude: act.productsExclude,
                    reportingPeriodTo: act.reportingPeriodTo,
                    periodFrom: act.periodFrom,
                    periodTo: act.periodTo,
                }
            }
        }
    };
};
