'use strict';

const { currency } = require("@config-rgsl/infrastructure/lib/ImplConstants");
const { reduceGroupBy } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function mapping(input, sinkExchange) {

    const pcs = sinkExchange.resolveContext('pcs');
    const dateAndCode = reduceGroupBy(
        pcs,
        [
            'docCurrencyCode',
            'installmentDueDate',
        ]
    );

    return dateAndCode.map(_ => ({
        request: {
            amount: 1,
            fromCurrencyCode: _.docCurrencyCode,
            toCurrencyCode: currency.localCurrency,
            atDate: _.installmentDueDate,
        }
    }));
};
