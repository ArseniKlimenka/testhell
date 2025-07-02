'use strict';

const { LocalDate } = require('@js-joda/core');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const inquiryData = sinkExchange.inquiryData;

    const workCalendar = sinkResult?.availabilityPerDate ? sinkResult.availabilityPerDate : [];
    const workCalendarSorted = workCalendar.sort((a, b) => a.date > b.date ? 1 : -1);
    const workingDaysAfterCoolPeriod = workCalendarSorted.filter(workingDays => workingDays.ruleLevel != 'exception');
    const actualCoolOffEndDate = workingDaysAfterCoolPeriod[0].date; // "Дата заключения договора" + Период охлаждения (14/30 дней с учетом рабочих)
    const receivedDate = inquiryData.receivedDate; // "Дата вступления в силу изменений / дата расторжения"

    sinkExchange.isCoolOffPeriod = DateTimeUtils.isBeforeOrEqual(DateTimeUtils.formatDate(actualCoolOffEndDate), DateTimeUtils.formatDate(receivedDate));
    sinkExchange.isAfterCoolOffPeriod = DateTimeUtils.isAfter(DateTimeUtils.formatDate(actualCoolOffEndDate), DateTimeUtils.formatDate(receivedDate));
    sinkExchange.currentDate = LocalDate.now().toString(); // Текущая дата

};
