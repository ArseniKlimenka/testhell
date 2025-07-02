'use strict';

const { currency } = require("@config-rgsl/infrastructure/lib/ImplConstants");
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const actItems = sinkExchange.resolveContext('actItems');
    const exchangeRates = sinkExchange.resolveContext('exchangeRates');
    const installmentAmounts = sinkResult.items;

    for (const actItem of actItems) {
        const installmentAmountItems = installmentAmounts.find(_ =>
            _.referenceNo === actItem.referenceNo &&
            _.dueDate === actItem.dueDate &&
            _.sourceLineId == actItem.sourceLineId);

        if (!installmentAmountItems) {
            throw `Installment was not found: referenceNo - ${actItem.referenceNo}, dueDate - ${actItem.dueDate}, sourceLineId - ${actItem.sourceLineId}`;
        }
        const installmentAmount = installmentAmountItems.installmentAmount;

        actItem.installmentDocAmount = installmentAmount;
        actItem.installmentLcAmount = getLcAmount(actItem.docCurrencyCode, actItem.dueDate, installmentAmount, exchangeRates);
    }
};

function getLcAmount(documentCurrencyCode, dueDate, amount, exchangeRates) {
    const er = exchangeRates.find(_ =>
        _.currencyCodeFrom === documentCurrencyCode &&
        _.currencyCodeTo === currency.localCurrency &&
        _.date === dueDate
    );

    return round(er.exchangeRate * amount, 2);
}
