'use strict';

const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { currency } = require("@config-rgsl/infrastructure/lib/ImplConstants");

module.exports = function mapping(input, sinkExchange) {

    return {
        request: {
            Amount: 1,
            FromCurrencyCode: input.body.endowmentAmounts.contractCurrency,
            ToCurrencyCode: currency.localCurrency,
            AtDate: dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT)
        }
    };
};
