const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

async function convert(fromCurrency, toCurrency, ambientProperties, exchangeRateDate) {

    const request = {
        method: "GET",
        url: `api/core/currency/convert?amount=1&fromCurrencyCode=${fromCurrency}&toCurrencyCode=${toCurrency}&exchangeRateDate=${exchangeRateDate}`,
        data: {}
    };

    return await ambientProperties.services.api.call(request);
}

async function exchangeRateLookup(cachedExchangeRates, payCurrency, docCurrency, ambientProperties, exchangeRateDate) {

    let result;
    const cachedExchangeRate = cachedExchangeRates.filter(x => x.fromExRateCode == payCurrency && x.toExRateCode == docCurrency && dateUtils.isEqual(x.exDate, exchangeRateDate));

    if (cachedExchangeRate.length === 1) {
        result = cachedExchangeRate[0].exRate;
    }
    else {
        // we always request payCurrency-docCurrency pair. And then accordingly use this in equation.
        const conversion = await convert(payCurrency, docCurrency, ambientProperties, exchangeRateDate);
        result = conversion.ExchangeRate;
        const exchangeRate = {
            fromExRateCode: payCurrency,
            toExRateCode: docCurrency,
            exRate: conversion.ExchangeRate,
            exDate: conversion.ExchangeDate
        };
        cachedExchangeRates.push(exchangeRate);
    }
    return result;
}

module.exports = {
    convert,
    exchangeRateLookup
};
