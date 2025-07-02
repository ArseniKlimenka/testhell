'use strict';

const { exchangeRateLookup } = require('@config-rgsl/acc-base/lib/currencyConversionHelper');
const { paymentLinesForCalculation } = require('@config-rgsl/acc-payment-order/lib/paymentOrderInternalConst');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const { currency } = require("@config-rgsl/infrastructure/lib/ImplConstants");

module.exports = async function onChangePaymentCurrency(input, ambientProperties) {

    const bankAccountCurrency = input.context.Body.recipientInformation?.bankAccount?.bankAccountCurrency;

    if (!input.data.paymentCurrencyCode) {

        input.context.Body.paymentOrderAmounts.exchangeRate = undefined;
        input.context.Body.recipientInformation.bankAccount = undefined;
        input.context.Body.paymentOrderAmounts.totalPaymentAmount = undefined;
        input.context.Body.paymentOrderAmounts.useFixedExchangeRate = false;

        updatePaymentLines(input);

        this.view.rebind();
        this.view.reevaluateRules();
        this.view.validate();
        return;
    }

    if (input.data.paymentCurrencyCode === currency.localCurrency) {

        input.context.Body.paymentOrderAmounts.useFixedExchangeRate = input.context.Body.paymentOrderAmounts.useFixedExchangeRateInitial;
    }
    else {

        input.context.Body.paymentOrderAmounts.useFixedExchangeRate = false;
    }

    if (bankAccountCurrency && (input.data.paymentCurrencyCode !== bankAccountCurrency)) {

        input.context.Body.recipientInformation.bankAccount = undefined;
    }

    const fromCurrency = input.data.paymentOrderCurrencyCode;
    const toCurrency = input.data.paymentCurrencyCode;
    const currentExchangeRate = await exchangeRateLookup([], fromCurrency, toCurrency, ambientProperties, input.context.Body.paymentOrderInformation.paymentOrderDate);
    input.context.Body.paymentOrderAmounts.exchangeRate = currentExchangeRate;

    const useFixedExchangeRate = input.context.Body.paymentOrderAmounts.useFixedExchangeRate ?? false;
    const exchangeRate = useFixedExchangeRate ?
        input.context.Body.paymentOrderAmounts.fixedExchangeRate :
        input.context.Body.paymentOrderAmounts.exchangeRate;

    updatePaymentLines(input);
    await updateNettedDocs(input, ambientProperties);

    const totalNettingAmount = input.context.Body.paymentOrderNetting.totalNettingAmount;

    const paymentAmountInDocCurrency = input.context.Body.paymentOrderAmounts.paymentAmountInDocCurrency;
    input.context.Body.paymentOrderAmounts.originalTotalAmount = round(paymentAmountInDocCurrency * exchangeRate);
    input.context.Body.paymentOrderAmounts.totalPaymentAmount = input.context.Body.paymentOrderAmounts.originalTotalAmount - totalNettingAmount;

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};

function updatePaymentLines(input) {

    let paymentLines = input.context.Body.paymentOrderItems || [];
    paymentLines = paymentLines.filter(item => paymentLinesForCalculation.includes(item.itemType));
    const useFixedExchangeRate = input.context.Body.paymentOrderAmounts.useFixedExchangeRate ?? false;
    const exchangeRate = useFixedExchangeRate ?
        input.context.Body.paymentOrderAmounts.fixedExchangeRate :
        input.context.Body.paymentOrderAmounts.exchangeRate;

    paymentLines.forEach(item => {

        item.paymentCurrencyAmount = round(item.paymentOrderCurrencyAmount * exchangeRate);
    });
}

async function updateNettedDocs(input, ambientProperties) {

    const nettedDocs = input.rootContext.Body.paymentOrderNetting.nettedDocuments || [];

    for (let index = 0; index < nettedDocs.length; index++) {

        const fromCurrency = input.rootContext.Body.paymentOrderAmounts.paymentCurrencyCode;
        const toCurrency = nettedDocs[index].documentCurrency;
        const paymentOrderDate = input.rootContext.Body.paymentOrderInformation.paymentOrderDate;
        const exchangeRate = await exchangeRateLookup([], fromCurrency, toCurrency, ambientProperties, paymentOrderDate);

        nettedDocs[index].exchangeRate = exchangeRate;
        nettedDocs[index].nettedAmountInDocCurrency = round(nettedDocs[index].nettedAmount * nettedDocs[index].exchangeRate);
    }

    input.context.Body.paymentOrderNetting.totalNettingAmount = nettedDocs.reduce((sum, doc) => sum + doc.nettedAmount, 0);
}
