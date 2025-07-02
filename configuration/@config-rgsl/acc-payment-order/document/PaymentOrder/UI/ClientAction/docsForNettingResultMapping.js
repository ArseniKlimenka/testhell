'use strict';

const { exchangeRateLookup } = require('@config-rgsl/acc-base/lib/currencyConversionHelper');

module.exports = async function docsForNettingResultMapping(input, ambientProperties) {


    const lookupSelection = input.getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        input.data.documentNumber = lookupSelection[0].resultData.contractNumber;
        input.data.initialOpenAmount = lookupSelection[0].resultData.openAmount;
        input.data.documentCurrency = lookupSelection[0].resultData.currency;

        const fromCurrency = input.rootContext.Body.paymentOrderAmounts.paymentCurrencyCode;
        const toCurrency = input.data.documentCurrency;
        const exchangeRate = await exchangeRateLookup([], fromCurrency, toCurrency, ambientProperties, input.rootContext.Body.paymentOrderInformation.paymentOrderDate);

        input.data.exchangeRate = exchangeRate;
    }
};
