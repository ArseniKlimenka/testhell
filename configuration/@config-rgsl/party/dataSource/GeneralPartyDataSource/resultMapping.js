'use strict';

const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function resultMapping(input) {

    const output = {};

    output.code = input.code;
    output.fullName = input.body.fullName || undefined;
    output.shortName = input.body.shortOrgName || undefined;
    output.firstName = input.body.firstName || undefined;
    output.lastName = input.body.lastName || undefined;
    output.middleName = input.body.middleName || undefined;
    output.dateOfBirth = input.body.dateOfBirth || undefined;
    output.birthPlace = input.body.birthPlace || undefined;
    output.OGRNOGRNIP = input.body.OGRNOGRNIP || undefined;
    output.partyType = input.metadata.configuration.name;
    output.INNKIO = input.body.INNKIO || undefined;
    output.KPP = input.body.KPP || undefined;
    output.isNonResident = input.body.isNonResident;
    output.duplicateMasterNumber = input.body.duplicateMasterNumber;
    output.identityDocuments = input.body.identityDocuments || undefined;
    output.naturalPersonCategory = input.body.naturalPersonCategory || undefined;
    output.citizenship = input.body.citizenship || undefined;
    output.SNILS = input.body.SNILS || undefined;
    output.isPublicOfficial = input.body.isPublicOfficial || undefined;
    output.executivePerson = input.body.executivePerson || undefined;
    output.relationType = input.body.relationType || undefined;
    output.partyEmails = input.body.partyEmails || undefined;
    output.partyPhones = input.body.partyPhones || undefined;

    output.partyAddresses = [];
    if (input.body.partyAddresses?.length > 0) {
        output.partyAddresses = input.body.partyAddresses.map(i => {
            return {
                ...i,
                isSameAsRegistration: typeof i.isSameAsRegistration == "boolean" ? i.isSameAsRegistration : false,
                isManualAddress: typeof i.isManualAddress == "boolean" ? i.isManualAddress : false
            };
        });
    }

    output.bankAccounts = input.body.bankAccounts || undefined;
    output.partyId = input.id;
    output.personGender = input.body.personGender || undefined;
    output.partyExcludedPersons = input.body.partyExcludedPersons || undefined;
    output.partyTaxResidencies = input.body.partyTaxResidencies || undefined;

    const criteria = this.businessContext.data.criteria;
    let identityDocuments = input.body.identityDocuments;
    if (identityDocuments && criteria.isDocClassIdentity) {
        identityDocuments = identityDocuments.filter(doc => partyConstants.partyIdentityDocumentType.includes(doc.identityDocumentType));
        if (identityDocuments.length == 0) {
            return;
        }
        return setDocumentInfo(output, criteria, identityDocuments);

    }
    return setDocumentInfo(output, criteria, identityDocuments);

};

function setDocumentInfo(output, criteria, identityDocuments) {
    if (identityDocuments && identityDocuments.length > 0) {
        identityDocuments = identityDocuments.filter(doc =>
            (doc.identityDocumentType == criteria.docTypeCode || !criteria.docTypeCode) &&
            (doc.documentSeries == criteria.docSeries || !criteria.docSeries) &&
            (doc.documentNumber == criteria.docNumber || !criteria.docNumber)
        );
        if (identityDocuments && identityDocuments.length > 0) {
            output.docTypeCode = identityDocuments[0].identityDocumentType || undefined;
            output.docSeries = identityDocuments[0].documentSeries || undefined;
            output.docNumber = identityDocuments[0].documentNumber || undefined;
            return output;
        }
        return;

    }
    return output;
}
