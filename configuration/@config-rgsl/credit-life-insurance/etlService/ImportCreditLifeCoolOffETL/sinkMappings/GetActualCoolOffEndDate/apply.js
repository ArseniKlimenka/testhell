'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const workCalendar = sinkResult?.availabilityPerDate ? sinkResult.availabilityPerDate.sort((a, b) => a.date > b.date ? 1 : -1) : [];
    const workingDaysAfterCoolPeriod = workCalendar.filter(workingDays => workingDays.ruleLevel != 'exception');
    const actualCoolOffEndDate = workingDaysAfterCoolPeriod[0].date;

    sinkExchange.actualCoolOffEndDate = actualCoolOffEndDate;
};
