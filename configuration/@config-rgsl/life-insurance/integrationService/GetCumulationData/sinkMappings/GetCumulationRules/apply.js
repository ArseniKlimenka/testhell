'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function applyData(sinkResult, sinkInput, sinkExchange) {

    let cumulationRules = [];

    if (sinkResult && sinkResult.data && sinkResult.data.length > 0) {
        cumulationRules = sinkResult.data.map(i => i.resultData);
        sinkExchange.cumulationRules = cumulationRules;
    }

    if (cumulationRules.length == 0) {
        const inputCriteria = sinkInput.input.data.criteria;
        const currentDate = DateTimeUtils.formatDate(inputCriteria.currentDate, DateTimeUtils.DateFormats.CALENDAR);
        const productCode = inputCriteria.productCode;
        const cumulationProductGroup = inputCriteria.cumulationProductGroup;
        this.stopExecution(`Правила кумуляции по коду продукта ${productCode} и группы ${cumulationProductGroup} на дату ${currentDate} не найдены.`);
    }

};
