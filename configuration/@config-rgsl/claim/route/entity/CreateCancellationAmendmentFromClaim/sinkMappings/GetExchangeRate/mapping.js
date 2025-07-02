'use strict';

const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { currency } = require("@config-rgsl/infrastructure/lib/ImplConstants");

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const contractBody = sinkExchange.contractData;

    return {
        request: {
            Amount: 0,
            FromCurrencyCode: contractBody.basicConditions.currency.currencyCode,
            ToCurrencyCode: currency.localCurrency,
            AtDate: dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT)
        }
    };
};
