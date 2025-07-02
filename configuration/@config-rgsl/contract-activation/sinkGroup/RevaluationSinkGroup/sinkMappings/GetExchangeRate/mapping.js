'use strict';

const { currency } = require('@config-rgsl/infrastructure/lib/ImplConstants');

module.exports = function mapping(input, sinkExchange) {
    const pp = sinkExchange.resolveContext('pp');
    if (!pp) {
        return;
    }

    let currencyCodes = pp.map(_ => _.currencyCode);
    currencyCodes = [...new Set(currencyCodes)];

    return currencyCodes.map(_ => ({
        request: {
            amount: 1,
            fromCurrencyCode: _,
            toCurrencyCode: currency.localCurrency,
            atDate: input.newRevaluationDate,
        }
    }));
};
