'use strict';

const { currency } = require('@config-rgsl/infrastructure/lib/ImplConstants');

module.exports = function recipientBankAccountResponseMapping(input) {

    if (!input.response.data || input.response.data.length === 0 || !input.response.data[0].resultData || input.response.data[0].resultData.length === 0) {

        return [];
    }

    const localCurrAccounts = input.response.data[0].resultData.filter(a => a.currency.currencyCode === currency.localCurrency);
    const nonLocalCurrAccounts = input.response.data[0].resultData.filter(a => a.currency.currencyCode !== currency.localCurrency);
    const accounts = localCurrAccounts.concat(nonLocalCurrAccounts);

    const result = accounts.map(item => {

        return {
            value: {
                bankId: item.bankId,
                bankName: item.bankName,
                bankBic: item.bankBic,
                bankCorrespondentAccount: item.bankCorrespondentAccount,
                SWIFT: item.SWIFT,
                IBAN: item.IBAN,
                foreignBank: item.foreignBank,
                currency: item.currency,
                number: item.number,
                openingDate: item.openingDate,
                closingDate: item.closingDate,
                bankInn: item.bankInn,
            },
            displayName: `${item.number}(${item.bankName})(${item.currency.currencyDesc})`
        };
    });

    return result;
};
