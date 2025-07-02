'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function applyData(sinkResult, sinkInput, sinkExchange) {

    let cumulationCurrencyRates = [];

    if (sinkResult && sinkResult.data && sinkResult.data.length > 0) {
        cumulationCurrencyRates = sinkResult.data.map(i => i.resultData);
        sinkExchange.cumulationCurrencyRates = cumulationCurrencyRates;
    }

    if (cumulationCurrencyRates.length == 0) {
        const inputCriteria = sinkInput.input.data.criteria;
        const currentDate = DateTimeUtils.formatDate(inputCriteria.currentDate, DateTimeUtils.DateFormats.CALENDAR);
        this.stopExecution(`Фиксированные курсы кумуляции на дату ${currentDate} не найдены.`);
    }
};
