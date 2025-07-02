'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const partyConstantsImpl = require('@config-rgsl/party/lib/partyConstantsImpl');

function checkDocument(body, attachmentsPackage, insuredPersonPartyId, requiredDocuments) {
    const issueDate = body.basicConditions?.issueDate;
    const dateOfBirth = body.insuredPerson?.partyData?.partyBody?.partyPersonData?.dateOfBirth;

    const issueDateObj = new Date(issueDate);
    const isInsuredPersonIsBelowAge14 = DateTimeUtils.getYearDifference(dateOfBirth, issueDateObj) <= 14;
    const isInsuredPersonAndPolicyHolderIsTheSame = body.insuredPerson?.partyData?.partyId === body.policyHolder?.partyData?.partyId;
    const hasRequiredDocument = attachmentsPackage?.some(item =>
        item.entityId.toUpperCase() === insuredPersonPartyId.toUpperCase() &&
        requiredDocuments.includes(item.attachmentType)
    );

    return { isInsuredPersonIsBelowAge14, isInsuredPersonAndPolicyHolderIsTheSame, hasRequiredDocument};
}

function isIdentityDocumentBelow14Issue(body, attachmentsPackage, insuredPersonPartyId) {
    if (!body.basicConditions?.issueDate || !body.insuredPerson?.partyData?.partyBody?.partyPersonData?.dateOfBirth) {
        return false;
    }

    const {isInsuredPersonIsBelowAge14, isInsuredPersonAndPolicyHolderIsTheSame, hasRequiredDocument} = checkDocument(body, attachmentsPackage, insuredPersonPartyId, [
        partyConstantsImpl.partyDocumentType.birthCertificate,
        partyConstantsImpl.partyDocumentType.passport
    ]);

    return isInsuredPersonIsBelowAge14 && !isInsuredPersonAndPolicyHolderIsTheSame && !hasRequiredDocument;
}

function isIdentityDocumentAbove14Issue(body, attachmentsPackage, insuredPersonPartyId) {
    if (!body.basicConditions?.issueDate || !body.insuredPerson?.partyData?.partyBody?.partyPersonData?.dateOfBirth) {
        return false;
    }

    const {isInsuredPersonIsBelowAge14, isInsuredPersonAndPolicyHolderIsTheSame, hasRequiredDocument} = checkDocument(body, attachmentsPackage, insuredPersonPartyId, [
        partyConstantsImpl.partyDocumentType.passport
    ]);

    return !isInsuredPersonIsBelowAge14 && !isInsuredPersonAndPolicyHolderIsTheSame && !hasRequiredDocument;
}

module.exports = {
    isIdentityDocumentBelow14Issue, isIdentityDocumentAbove14Issue
};
