'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function currencyFilter(input, ambientProperties) {

    const currencies = input.items;

    const uniqueProductConfCurrencies = input.rootContext.ClientViewModel?.uniqueProductConfCurrencies ?? [];

    const availableCurrencies = currencies.filter(i => uniqueProductConfCurrencies.includes(i.currencyCode));

    return availableCurrencies;
};
