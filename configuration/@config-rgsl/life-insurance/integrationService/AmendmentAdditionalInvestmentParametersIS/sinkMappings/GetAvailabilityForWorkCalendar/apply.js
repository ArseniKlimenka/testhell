'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const workCalendar = sinkResult?.availabilityPerDate ? sinkResult.availabilityPerDate : [];
    const workCalendarSorted = workCalendar.sort((a, b) => a.date > b.date ? 1 : -1);
    const workingDays = workCalendarSorted.filter(workingDays => workingDays.ruleLevel != 'exception');
    const workDay5 = workingDays[5].date;

    sinkExchange.workDay5 = workDay5;

};
