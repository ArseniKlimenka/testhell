'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const implConstants = require('@config-rgsl/infrastructure/lib/ImplConstants');

module.exports = function mapping(sinkInput, sinkExchange) {

    sinkExchange.inquiryData = sinkInput;

    const policyIssueDate = sinkInput.policyIssueDate;
    const policyProductCode = sinkInput.policyProductCode;
    const productConf = sinkExchange.productConfiguration;
    const coolOffPeriodDays = productConf.coolOffPeriodDays;
    const coolOffPeriodEnd = DateTimeUtils.addDays(policyIssueDate, coolOffPeriodDays - 1);

    return {
        calendarCode: implConstants.workCalendar.companyCalendar,
        from: policyIssueDate,
        to: coolOffPeriodEnd
    };

};
