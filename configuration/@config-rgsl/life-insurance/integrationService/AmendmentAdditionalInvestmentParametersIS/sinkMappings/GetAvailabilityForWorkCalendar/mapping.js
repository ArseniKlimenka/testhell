'use strict';

const implConstants = require('@config-rgsl/infrastructure/lib/ImplConstants');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(sinkInput, sinkExchange) {

    const fromDate = DateTimeUtils.dateNow();
    const toDate = DateTimeUtils.addDays(fromDate, sinkInput.workCalendarPeriodDays);

    return {
        calendarCode: implConstants.workCalendar.companyCalendar,
        from: fromDate,
        to: toDate
    };

};
