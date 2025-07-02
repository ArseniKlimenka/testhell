"use strict";

const { currency } = require("@config-rgsl/infrastructure/lib/ImplConstants");

module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0) {

        return;
    }

    const beneficiaries = input.endowmentBeneficiaries ?? [];

    beneficiaries.forEach(item => {

        let beneficiaryBankAccounts = dataSource.data.find(data => data.resultData.partyCode === item.partyCode)?.resultData?.body?.partyBankAccounts ?? [];
        beneficiaryBankAccounts = beneficiaryBankAccounts.filter(acc => !acc.closingDate);

        if (beneficiaryBankAccounts.length > 0) {

            let defaultBankAccount = beneficiaryBankAccounts.find(acc => acc.currency.currencyCode === currency.localCurrency);

            if (!defaultBankAccount) {

                defaultBankAccount = beneficiaryBankAccounts[0];
            }

            item.bankAccount = {
                bankId: defaultBankAccount.bankId,
                bankName: defaultBankAccount.bankName,
                bankBic: defaultBankAccount.bankBic,
                bankCorrespondentAccount: defaultBankAccount.bankCorrespondentAccount,
                SWIFT: defaultBankAccount.SWIFT,
                IBAN: defaultBankAccount.IBAN,
                foreignBank: defaultBankAccount.foreignBank,
                currency: defaultBankAccount.currency,
                number: defaultBankAccount.number,
                openingDate: defaultBankAccount.openingDate,
                closingDate: defaultBankAccount.closingDate,
                bankInn: defaultBankAccount.bankInn,
            };
        }
    });
};
