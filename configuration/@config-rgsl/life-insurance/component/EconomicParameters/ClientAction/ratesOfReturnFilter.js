'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function ratesOfReturnFilter(input, ambientProperties) {

    const ratesOfReturns = input.items;

    const policyIssueDateEnd = input.data.policyIssueDateEnd;
    const policyIssueDateStart = input.data.policyIssueDateStart;
    const subObject = 'value';

    let availableRatesOfReturns = DateTimeUtils.filterDateRanges(ratesOfReturns, policyIssueDateStart, policyIssueDateEnd, subObject);

    const currencyCode = input.data?.currency?.currencyCode;

    if (currencyCode) {
        availableRatesOfReturns = availableRatesOfReturns.filter(i => i.value.currencyCode == currencyCode);
    }

    return availableRatesOfReturns;
};
