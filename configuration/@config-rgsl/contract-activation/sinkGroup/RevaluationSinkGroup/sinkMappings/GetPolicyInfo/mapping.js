'use strict';

const { currency } = require('@config-rgsl/infrastructure/lib/ImplConstants');

module.exports = function mapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    contractNumbers: input.contractNumbers,
                    skipFixedExchangeRate: true,
                    skipCurrencies: [currency.localCurrency],
                }
            }
        }
    };
};
