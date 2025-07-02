'use strict';

const { ZonedDateTime, ZoneOffset } = require('@js-joda/core');
const { currency } = require('@config-rgsl/infrastructure/lib/ImplConstants');

module.exports = function mapping(input, sinkExchange) {
    const policyInfos = sinkExchange.resolveContext('policyInfos');
    if (policyInfos.length === 0) {
        return;
    }

    let currencyCodes = policyInfos.map(_ => _.currencyCode);
    currencyCodes = [...new Set(currencyCodes)];
    const loadDate = ZonedDateTime.now(ZoneOffset.UTC).toString();
    sinkExchange.mapContext('loadDate', loadDate);

    return currencyCodes.map(_ => ({
        request: {
            amount: 1,
            fromCurrencyCode: _,
            toCurrencyCode: currency.localCurrency,
            atDate: loadDate,
        }
    }));
};
