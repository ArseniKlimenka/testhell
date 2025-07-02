'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.paticipantsData = sinkResult.data.map(p => ({
        resultData: {
            partyId: p.resultData.partyId,
            code: p.resultData.partyCode,
            partyType: p.resultData.partyType,
            shortName: p.resultData.commonBody.attributes.shortOrgName,
            fullName: p.resultData.commonBody.fullName,
            INNKIO: p.resultData.commonBody.attributes.INNKIO,
            KPP: p.resultData.commonBody.attributes.KPP,
            OGRNOGRNIP: p.resultData.commonBody.attributes.OGRNOGRNIP,
            dateOfBirth: p.resultData.commonBody.dateOfBirth,
            firstName: p.resultData.commonBody.firstName,
            lastName: p.resultData.commonBody.lastName,
            middleName: p.resultData.commonBody.attributes.middleName,
            personGender: p.resultData.commonBody.attributes.personGender,
            citizenship: p.resultData.body.partyPersonData.citizenship?.map(_ => ({ countryShortName: _.countryShortName })),
            identityDocuments: p.resultData.body.partyDocuments?.map(_ => ({
                identityDocumentType: _.docType.docTypeCode,
                documentSeries: _.docSeries,
                documentNumber: _.docNumber,
                issueDate: _.issueDate,
                issuerName: _.issuerName,
            })),
            birthPlace: p.resultData.body.partyPersonData.birthPlace,
            naturalPersonCategory: p.resultData.body.partyPersonData.naturalPersonCategory,
            SNILS: p.resultData.body.partyPersonData.SNILS,
            isPublicOfficial: p.resultData.body.partyPersonData.isPublicOfficial,
            executivePerson: p.resultData.body.partyPersonData.executivePerson,
            relationType: p.resultData.body.partyPersonData.relationType,
            isNonResident: p.resultData.commonBody.attributes.isNonResident,
            partyEmails: p.resultData.body.partyEmails,
            partyPhones: p.resultData.body.partyPhones,
            bankAccounts: p.resultData.body.partyBankAccounts?.map(_ => ({
                accountNumber: _.number,
                bankName: _.bankName,
                bankBic: _.bankBic,
                bankCorrespondentAccount: _.bankCorrespondentAccount,
                SWIFT: _.SWIFT,
                currency: _.currency?.currencyCode,
            })),
        }
    }));
};
