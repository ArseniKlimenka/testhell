'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
module.exports = function resultMapping(input) {

    const output = {};
    const body = JSON.parse(input.BODY);

    output.partyCode = input.PARTY_CODE;
    output.fullName = input.FULL_NAME;
    output.partyBankAccount = input.ACCOUNT_NUMBER;
    output.bankAccountBankCode = input.BANK_CODE;
    output.bankAccountCurrencyCode = input.CURRENCY_CODE;
    output.partyType = input.PARTY_TYPE;
    output.INN = input.INN;
    output.KPP = getValue(body, 'partyOrganisationData.KPP');
    output.isNonResident = getValue(body, 'partyGeneralData.isNonResident');

    const additionalBankAccountData = body.partyBankAccounts.find(a => a.number == input.ACCOUNT_NUMBER);
    output.corrBankAccount = additionalBankAccountData.bankCorrespondentAccount;
    output.partyBankAccountName = additionalBankAccountData.bankName;

    return output;
};
