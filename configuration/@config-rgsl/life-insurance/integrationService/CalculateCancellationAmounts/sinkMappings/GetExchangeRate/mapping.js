'use strict';

const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { currency } = require("@config-rgsl/infrastructure/lib/ImplConstants");

module.exports = function mapping(input, sinkExchange) {

    const stateBody = sinkExchange.contractStateBody;
    const contractCurrency = stateBody.basicConditions.currency.currencyCode;

    return {
        request: {
            Amount: 1,
            FromCurrencyCode: contractCurrency,
            ToCurrencyCode: currency.localCurrency,
            AtDate: dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT)
        }
    };
};
