'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const workCalendar = sinkResult?.availabilityPerDate ? sinkResult.availabilityPerDate : [];
    const workCalendarSorted = workCalendar.sort((a, b) => a.date > b.date ? 1 : -1);
    const workingDays = workCalendarSorted.filter(workingDays => workingDays.ruleLevel != 'exception');
    sinkExchange.workingDaysBeforeCurrentDate = workingDays
        .filter(workingDays => workingDays.date < sinkExchange.currentDate).length; // Рабочие дни с даты создания Запроса до текущей даты.
};
