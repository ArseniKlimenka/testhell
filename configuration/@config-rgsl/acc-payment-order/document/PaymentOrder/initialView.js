const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { currency } = require("@config-rgsl/infrastructure/lib/ImplConstants");

module.exports = function mapDetailsGetInitViewModel(input) {
    if (input.Body && !input.Number) {

        input.Body.paymentOrderAmounts.paymentCurrencyCode = currency.localCurrency;
        input.Body.paymentOrderInformation.paymentOrderDate = dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT);
    }

    return input;

};
