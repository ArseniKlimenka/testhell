'use strict';
const implConstants = require('@config-rgsl/infrastructure/lib/ImplConstants');

module.exports = function mapping(lineInput, sinkExchange) {

    return {
        calendarCode: implConstants.workCalendar.companyCalendar,
        from: sinkExchange.coolOffFrom,
        to: sinkExchange.coolOffTo
    };
};
