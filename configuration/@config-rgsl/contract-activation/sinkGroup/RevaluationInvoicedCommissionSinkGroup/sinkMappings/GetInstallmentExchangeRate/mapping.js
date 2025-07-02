'use strict';

const { reduceGroupBy } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const { currency } = require('@config-rgsl/infrastructure/lib/ImplConstants');

module.exports = function mapping(input, sinkExchange) {
    const lastInvoicedCommission = sinkExchange.resolveContext('lastInvoicedCommission');
    if (lastInvoicedCommission.length === 0) {
        return;
    }

    const dueDates = reduceGroupBy(lastInvoicedCommission, [
        'dueDate',
        'currencyCode',
    ]);

    return dueDates.map(_ => ({
        request: {
            amount: 1,
            fromCurrencyCode: _.currencyCode,
            toCurrencyCode: currency.localCurrency,
            atDate: _.dueDate,
        }
    }));
};
