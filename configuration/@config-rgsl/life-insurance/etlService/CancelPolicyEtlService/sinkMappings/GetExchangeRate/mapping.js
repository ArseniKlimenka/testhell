'use strict';

const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { currency } = require("@config-rgsl/infrastructure/lib/ImplConstants");

module.exports = function mapping(input, sinkExchange) {

    if (!sinkExchange.canCreateCancellation) {

        return null;
    }

    const stateBody = (sinkExchange.latestContractData.seqNumber == 0 ? sinkExchange.latestContractData.body : sinkExchange.latestContractData.snapshotBody)
    ?? sinkExchange.latestContractData.body;

    return {
        request: {
            Amount: 0,
            FromCurrencyCode: stateBody.basicConditions.currency.currencyCode,
            ToCurrencyCode: currency.localCurrency,
            AtDate: dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT)
        }
    };
};
