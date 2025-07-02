'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function searchDocumentApplyFunction(input, output) {

    output.birthPlace = getValue(input, 'body.partyPersonData.birthPlace');
    output.naturalPersonCategory = getValue(input, 'body.partyPersonData.naturalPersonCategory');
    output.citizenship = getValue(input, 'body.partyPersonData.citizenship');
    output.SNILS = getValue(input, 'body.partyPersonData.SNILS');
    output.isPublicOfficial = getValue(input, 'body.partyPersonData.isPublicOfficial');
    output.executivePerson = getValue(input, 'body.partyPersonData.executivePerson');
    output.relationType = getValue(input, 'body.partyPersonData.relationType');
    output.partyEmails = getValue(input, 'body.partyEmails', []);
    output.partyPhones = getValue(input, 'body.partyPhones', []);
    output.partyAddresses = getValue(input, 'body.partyAddresses', []);

    const partyBankAccounts = getValue(input, 'body.partyBankAccounts', []);
    output.bankAccounts = partyBankAccounts.map(item => {
        return {
            accountNumber: item.number,
            bankId: item.bankId,
            bankName: item.bankName,
            bankBic: item.bankBic,
            bankCorrespondentAccount: item.bankCorrespondentAccount,
            SWIFT: item.SWIFT,
            IBAN: item.IBAN,
            foreignBank: item.foreignBank,
            currency: item.currency,
            openingDate: item.openingDate,
            closingDate: item.closingDate,
            bankInn: item.bankInn
        };
    });

    output.identityDocuments = getValue(input, 'body.partyDocuments', []).map(item => {
        return {
            identityDocumentType: item.docType.docTypeCode,
            documentSeries: item.docSeries,
            documentNumber: item.docNumber,
            issueDate: item.issueDate,
            issuerName: item.issuerName,
            issuerCode: item.issuerCode
        };
    });

    output.partyExcludedPersons = getValue(input, 'body.partyExcludedPersons');
    output.partyTaxResidencies = getValue(input, 'body.partyTaxResidencies');
};
