'use strict';

const { getCoef, getSurrenderValue } = require('@config-rgsl/life-insurance/component/LifeInsurancePaymentCalculation/lib/paymentCalculationHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    const resultData = sinkResult.data[0].resultData;
    const contractBody = resultData.body;
    const validFrom = sinkExchange.validFrom;

    sinkExchange.coef = getCoef(validFrom, contractBody);
    sinkExchange.surrenderValue = getSurrenderValue(validFrom, contractBody);
    sinkExchange.riskPremium = contractBody.basicConditions.riskPremium;
};
