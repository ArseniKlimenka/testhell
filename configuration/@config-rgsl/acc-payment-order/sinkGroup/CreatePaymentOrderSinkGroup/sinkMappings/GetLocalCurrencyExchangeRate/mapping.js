'use strict';

const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { currency } = require("@config-rgsl/infrastructure/lib/ImplConstants");
const { paymentOrderType, paymentOrderSubType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function mapping(integrationServiceInput, sinkExchange) {

    if (integrationServiceInput.paymentOrderType === paymentOrderType.Claim &&
        integrationServiceInput.paymentOrderSubtype === paymentOrderSubType.Endowment) {

        return {
            request: {
                Amount: sinkExchange.endowmentData.amountInContractCurrency,
                FromCurrencyCode: sinkExchange.endowmentData.contractCurrency,
                ToCurrencyCode: currency.localCurrency,
                AtDate: dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT)
            }
        };
    }
};
