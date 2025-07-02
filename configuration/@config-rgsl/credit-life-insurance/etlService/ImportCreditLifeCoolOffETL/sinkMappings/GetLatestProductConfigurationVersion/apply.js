'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult?.data && sinkResult.data[0]?.resultData?.version) {
        sinkExchange.productConfiguration = sinkResult.data[0].resultData;
    }

    const productConf = sinkExchange.productConfiguration;
    const coolOffPeriodDays = productConf.coolOffPeriodDays;
    const contractIssueDate = sinkExchange.stateBody.basicConditions.issueDate;
    const coolOffPeriodEnd = DateTimeUtils.addDays(contractIssueDate, coolOffPeriodDays);
    const checkWorkingDaysPeriod = 30;
    const fromDate = coolOffPeriodEnd;
    const toDate = DateTimeUtils.addDays(coolOffPeriodEnd, checkWorkingDaysPeriod);

    sinkExchange.coolOffFrom = fromDate;
    sinkExchange.coolOffTo = toDate;

};
