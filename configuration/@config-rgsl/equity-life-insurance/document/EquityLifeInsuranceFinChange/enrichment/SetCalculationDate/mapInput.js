const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(input) {
    const body = this?.businessContext?.rootData;
    const applicationDate = body?.basicConditions?.applicationDate;
    const firstDayOfNextMonth = DateTimeUtils.getFirstDateOfMonth(DateTimeUtils.addMonths(applicationDate, 1));
    const lastDayOfNextMonth = DateTimeUtils.getLastDateOfMonth(DateTimeUtils.addMonths(applicationDate, 1));

    return {
        fromDate: firstDayOfNextMonth,
        toDate: lastDayOfNextMonth
    };
};
