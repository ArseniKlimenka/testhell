'use strict';

module.exports = function recipientBankAccountSearchResponseMapping(input) {

    let accountsArray = [];
    const paymentCurrencyCode = input.context.Body.paymentOrderAmounts?.paymentCurrencyCode;

    if (!input.response.data || !input.response.data[0] || !paymentCurrencyCode) {

        return accountsArray;
    }

    accountsArray = input.response.data[0].resultData;

    accountsArray = accountsArray
        .filter(elem => elem.currency && elem.currency.currencyCode === paymentCurrencyCode)
        .map(elem => {
            return {
                value: {
                    bankAccountNumber: elem.number,
                    correspondentBankAccount: elem.bankCorrespondentAccount,
                    bankBIC: elem.bankBic,
                    bankAccountCurrency: elem.currency.currencyCode,
                    bankName: elem.bankName
                },
                displayName: elem.number
            };
        });

    return accountsArray;
};
