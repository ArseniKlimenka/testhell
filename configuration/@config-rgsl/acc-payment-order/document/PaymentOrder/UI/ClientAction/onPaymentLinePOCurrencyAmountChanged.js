'use strict';

const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function onPaymentLinePOCurrencyAmountChanged(input) {

    const useFixedExchangeRate = input.rootContext.Body.paymentOrderAmounts.useFixedExchangeRate ?? false;
    const exchangeRate = useFixedExchangeRate ?
        input.rootContext.Body.paymentOrderAmounts.fixedExchangeRate :
        input.rootContext.Body.paymentOrderAmounts.exchangeRate;

    if (input.data.paymentOrderCurrencyAmount) {

        input.data.paymentCurrencyAmount = round(input.data.paymentOrderCurrencyAmount * exchangeRate);
    }
    else {

        input.data.paymentCurrencyAmount = undefined;
    }
};
