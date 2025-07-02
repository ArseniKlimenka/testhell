'use strict';

const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { currency } = require("@config-rgsl/infrastructure/lib/ImplConstants");
const { paymentOrderType, paymentOrderSubType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function mapping(integrationServiceInput, sinkExchange) {

    if (integrationServiceInput.paymentOrderType === paymentOrderType.PolicyCancellation) {

        const predefinedBankAccountNumber = sinkExchange.contractData.paymentBankAccountNumber;
        const recipientBankAccountToSet = getPredefinedBankAccount(predefinedBankAccountNumber, sinkExchange);
        sinkExchange.contractData.recipientBankAccountToSet = recipientBankAccountToSet;
        const currencyToSet = recipientBankAccountToSet?.currency?.currencyCode;

        return {
            request: {
                Amount: sinkExchange.contractData.recipientAmountDocCurrency,
                FromCurrencyCode: sinkExchange.contractData.policyCurrency,
                ToCurrencyCode: currencyToSet ?? currency.localCurrency,
                AtDate: dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT)
            }
        };
    }
    else if (integrationServiceInput.paymentOrderType === paymentOrderType.Claim && !integrationServiceInput.paymentOrderSubtype) {

        const predefinedBankAccountNumber = sinkExchange.claimData.paymentBankAccountNumber;
        const recipientBankAccountToSet = getPredefinedBankAccount(predefinedBankAccountNumber, sinkExchange);
        sinkExchange.claimData.recipientBankAccountToSet = recipientBankAccountToSet;
        const currencyToSet = recipientBankAccountToSet?.currency?.currencyCode;

        return {
            request: {
                Amount: sinkExchange.claimData.amountInContractCurrency,
                FromCurrencyCode: sinkExchange.claimData.contractCurrency,
                ToCurrencyCode: currencyToSet ?? currency.localCurrency,
                AtDate: dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT)
            }
        };
    }
    else if (integrationServiceInput.paymentOrderType === paymentOrderType.Claim &&
        integrationServiceInput.paymentOrderSubtype === paymentOrderSubType.Collective) {

        const recipientBankAccountToSet = getPredefinedBankAccount(undefined, sinkExchange);
        sinkExchange.claimData.recipientBankAccountToSet = recipientBankAccountToSet;
        const currencyToSet = recipientBankAccountToSet?.currency?.currencyCode;

        return {
            request: {
                Amount: sinkExchange.claimData.amountInContractCurrency,
                FromCurrencyCode: sinkExchange.claimData.contractCurrency,
                ToCurrencyCode: currencyToSet ?? currency.localCurrency,
                AtDate: dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT)
            }
        };
    }
    else if (integrationServiceInput.paymentOrderType === paymentOrderType.Claim &&
        integrationServiceInput.paymentOrderSubtype === paymentOrderSubType.Endowment) {

        const predefinedBankAccountNumber = sinkExchange.endowmentData.paymentBankAccountNumber;
        const recipientBankAccountToSet = getPredefinedBankAccount(predefinedBankAccountNumber, sinkExchange);
        sinkExchange.endowmentData.recipientBankAccountToSet = recipientBankAccountToSet;
        const currencyToSet = recipientBankAccountToSet?.currency?.currencyCode;

        return {
            request: {
                Amount: sinkExchange.endowmentData.amountInContractCurrency,
                FromCurrencyCode: sinkExchange.endowmentData.contractCurrency,
                ToCurrencyCode: currencyToSet ?? currency.localCurrency,
                AtDate: dateHelper.newDateAsString(dateHelper.DateFormats.ECMASCRIPT)
            }
        };
    }
};

function getPredefinedBankAccount(number, sinkExchange) {

    let recipientBankAccounts = sinkExchange.recipientPartyData?.body?.partyBankAccounts ?? [];
    const dateNow = dateHelper.dateNow(dateHelper.DateFormats.ECMASCRIPT);
    recipientBankAccounts = recipientBankAccounts.filter(acc => !acc.closingDate || acc.closingDate > dateNow);
    let recipientBankAccountToSet = undefined;

    if (number && recipientBankAccounts.length > 0) {

        recipientBankAccountToSet = recipientBankAccounts.find(item => item.number === number);
    }
    else {

        recipientBankAccountToSet = recipientBankAccounts.find(account => account.currency.currencyCode === currency.localCurrency);
    }

    return recipientBankAccountToSet;
}
