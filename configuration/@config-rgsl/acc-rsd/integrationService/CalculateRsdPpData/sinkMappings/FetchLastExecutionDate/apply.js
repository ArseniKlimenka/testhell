'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function (sinkResult, sinkInput, sinkExchange) {
    const lastExecutionDate = sinkResult.data.lastExecutionDate;
    sinkExchange.mapContext('lastExecutionDate', lastExecutionDate);
    const dateNow = sinkExchange.resolveContext('dateNow');

    const compDates = dateUtils.compareDates(lastExecutionDate, dateNow);
    if (compDates < 0) {
        sinkExchange.mapContext('ok', true);
    }
};
