'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const currentRow = sinkExchange.currentRow;

    if (sinkResult.data.length == 0) {

        const reportDate = DateTimeUtils.formatDate(currentRow.reportDate, DateTimeUtils.DateFormats.CALENDAR);
        throw new Error(`E: Данные о фондах должны присутствовать в системе за дату: ${reportDate}.`);
    }
};
