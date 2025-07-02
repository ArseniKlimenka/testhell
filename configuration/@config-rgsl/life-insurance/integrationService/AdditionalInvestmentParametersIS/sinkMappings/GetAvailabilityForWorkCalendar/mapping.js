'use strict';

const implConstants = require('@config-rgsl/infrastructure/lib/ImplConstants');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(sinkInput, sinkExchange) {

    const productCode = sinkInput.productCode;
    const issueDate = sinkInput.issueDate;
    const insuranceTerms = sinkInput.insuranceTerms;
    const workCalendarPeriodDays = sinkInput.workCalendarPeriodDays;
    const workCalendarPeriodDaysEnd = DateTimeUtils.addDays(issueDate, workCalendarPeriodDays);
    const coolOffPeriodDays = sinkInput.coolOffPeriodDays ?? 0;
    const daysAfterCoolOffPeriod = sinkInput.daysAfterCoolOffPeriod ?? 0;
    const numOfWorkDaysToInvest = sinkInput.numOfWorkDaysToInvest;
    const investmentManualRate = sinkInput.investmentManualRate;
    const coolOffPeriodEnd = DateTimeUtils.addDays(issueDate, coolOffPeriodDays);

    sinkExchange.productCode = productCode;
    sinkExchange.issueDate = issueDate;
    sinkExchange.insuranceTerms = insuranceTerms;
    sinkExchange.coolOffPeriodDays = coolOffPeriodDays;
    sinkExchange.daysAfterCoolOffPeriod = daysAfterCoolOffPeriod;
    sinkExchange.numOfWorkDaysToInvest = numOfWorkDaysToInvest;
    sinkExchange.coolOffPeriodEnd = coolOffPeriodEnd;
    sinkExchange.investmentManualRate = investmentManualRate;

    if (!issueDate) {
        return;
    }

    return {
        calendarCode: implConstants.workCalendar.companyCalendar,
        from: issueDate,
        to: workCalendarPeriodDaysEnd
    };
};
