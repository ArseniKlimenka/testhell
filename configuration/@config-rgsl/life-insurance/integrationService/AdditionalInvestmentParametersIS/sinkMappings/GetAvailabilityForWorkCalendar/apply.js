'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const workCalendarWithIsWork = sinkExchange.workCalendarWithIsWork ?? [];
    const workCalendarWithIsWorkAndException = workCalendarWithIsWork.filter(i => i.ruleLevel == 'exception' && i.isWork);

    const daysAfterCoolOffPeriod = sinkExchange.daysAfterCoolOffPeriod;
    const coolOffPeriodEnd = sinkExchange.coolOffPeriodEnd;
    const numOfWorkDaysToInvest = sinkExchange.numOfWorkDaysToInvest;

    const workCalendarByPeriod = sinkResult?.availabilityPerDate ? sinkResult.availabilityPerDate : [];

    if (workCalendarByPeriod.length == 0) {
        this.stopExecution(`Рабочий календарь не найден или данные в нём отсутствуют.`);
    }

    const workCalendarSortedByPeriod = workCalendarByPeriod.sort((a, b) => a.date > b.date ? 1 : -1);

    for (let i = 0; i < workCalendarWithIsWorkAndException.length; i++) {

        for (let j = 0; j < workCalendarSortedByPeriod.length; j++) {

            if (workCalendarWithIsWorkAndException[i].dateFrom <= workCalendarSortedByPeriod[j].date && workCalendarWithIsWorkAndException[i].dateTo >= workCalendarSortedByPeriod[j].date) {

                const wcsIndexToUpdate = workCalendarSortedByPeriod.findIndex(wcs => wcs.date >= workCalendarWithIsWorkAndException[i].dateFrom && wcs.date <= workCalendarWithIsWorkAndException[i].dateTo);
                workCalendarSortedByPeriod[wcsIndexToUpdate].isWork = true;
            }
        }
    }

    const workCalendarInCoolOffPeriod = workCalendarSortedByPeriod.filter(workingDays => workingDays.date < coolOffPeriodEnd);
    const workCalendarAfterCoolOffPeriod = workCalendarSortedByPeriod.filter(workingDays => workingDays.date >= coolOffPeriodEnd);

    const lastCoolOffPeriodDay = workCalendarInCoolOffPeriod[workCalendarInCoolOffPeriod.length - 1];
    const lastCoolOffPeriodDate = lastCoolOffPeriodDay?.date;
    const isWeekendLastCoolOffPeriodDay = lastCoolOffPeriodDay?.ruleLevel == 'exception' && !lastCoolOffPeriodDay?.isWork;

    const workingDaysAfterCoolPeriod = workCalendarAfterCoolOffPeriod.filter(workingDays => (workingDays.ruleLevel != 'exception') || (workingDays.ruleLevel == 'exception' && workingDays.isWork));
    const firstWorkingDayAfterCoolOffPeriod = workingDaysAfterCoolPeriod[0 + daysAfterCoolOffPeriod];
    const firstWorkingDateAfterCoolOffPeriod = firstWorkingDayAfterCoolOffPeriod.date;

    if (numOfWorkDaysToInvest) {

        const workCalendarAfterFirstWorkingDate = workCalendarSortedByPeriod.filter(workingDays => workingDays.date >= firstWorkingDateAfterCoolOffPeriod);
        const workingDaysAfterFirstWorkingDate = workCalendarAfterFirstWorkingDate.filter(workingDays => (workingDays.ruleLevel != 'exception') || (workingDays.ruleLevel == 'exception' && workingDays.isWork));

        const firstWorkingDayAfterNumOfWorkDaysToInvest = workingDaysAfterFirstWorkingDate[numOfWorkDaysToInvest];
        const firstWorkingDateAfterNumOfWorkDaysToInvest = firstWorkingDayAfterNumOfWorkDaysToInvest.date;

        sinkExchange.firstWorkingDayAfterNumOfWorkDaysToInvest = firstWorkingDayAfterNumOfWorkDaysToInvest;
        sinkExchange.firstWorkingDateAfterNumOfWorkDaysToInvest = firstWorkingDateAfterNumOfWorkDaysToInvest;
    }

    sinkExchange.coolOffPeriodEnd = coolOffPeriodEnd;
    sinkExchange.workCalendarSortedByPeriod = workCalendarSortedByPeriod;
    sinkExchange.workCalendarInCoolOffPeriod = workCalendarInCoolOffPeriod;
    sinkExchange.workCalendarAfterCoolOffPeriod = workCalendarAfterCoolOffPeriod;
    sinkExchange.lastCoolOffPeriodDay = lastCoolOffPeriodDay;
    sinkExchange.lastCoolOffPeriodDate = lastCoolOffPeriodDate;
    sinkExchange.isWeekendLastCoolOffPeriodDay = isWeekendLastCoolOffPeriodDay;
    sinkExchange.workingDaysAfterCoolPeriod = workingDaysAfterCoolPeriod;
    sinkExchange.firstWorkingDayAfterCoolOffPeriod = firstWorkingDayAfterCoolOffPeriod;
    sinkExchange.firstWorkingDateAfterCoolOffPeriod = firstWorkingDateAfterCoolOffPeriod;

};
