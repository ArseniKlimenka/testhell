"use strict";

const { getValue, groupBy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0) {

        return;
    }

    const mappedResult = dataSource.data.map(item => {
        const result = item.resultData;
        result.paymentYear = dateUtils.getYear(result.paymentDate).toString();
        return result;
    });

    let groupedByYear = groupBy(mappedResult, "paymentYear");

    const yearNow = dateUtils.yearNow();
    groupedByYear = groupedByYear.filter(item => parseInt(item.key) >= amendmentConstants.minTaxDeductionYear && parseInt(item.key) < yearNow);
    const body = this.businessContext.rootData;

    body.taxDeductionItems = groupedByYear.map(item => {
        return {
            year: item.key,
            yearPaymentsAmount: item.items.reduce((sum, current) => sum + round(current.docAmount * current.localCurrencyExchangeRate), 0)
        };
    }).sort((first, second) => parseInt(first.year) - parseInt(second.year));
};
