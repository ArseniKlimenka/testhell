const implConstants = require('@config-rgsl/infrastructure/lib/ImplConstants');

module.exports = function mapping(sinkInput, sinkExchange) {
    return {
        calendarCode: implConstants.workCalendar.companyCalendar,
        from: sinkInput.fromDate,
        to: sinkInput.toDate
    };
};
