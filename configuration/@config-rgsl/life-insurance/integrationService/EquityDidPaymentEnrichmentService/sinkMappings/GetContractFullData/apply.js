'use strict';

const { brokerConfiguration } = require('@config-rgsl/life-insurance/lib/brokerConfiguration');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    const resultData = sinkResult?.data[0]?.resultData;
    const body = resultData?.body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body?.basicConditions?.issueDate;
    const mf = body?.additionalInvestmentParameters?.mf;

    sinkExchange.mf = mf;

    const brokerConf = brokerConfiguration({ productCode, issueDate }) || {};
    const year = DateTimeUtils.getYearDifference(issueDate, DateTimeUtils.dateNow());
    const insurerShareExpensesByYearProperty = `insurerShareExpensesByYear_${year}`;
    const insurerShareExpensesByYear = brokerConf[insurerShareExpensesByYearProperty];

    sinkExchange.insurerShareExpensesByYear = insurerShareExpensesByYear;

};
