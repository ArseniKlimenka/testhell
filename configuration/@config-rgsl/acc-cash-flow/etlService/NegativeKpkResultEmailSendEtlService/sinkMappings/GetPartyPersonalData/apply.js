const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult?.data?.length === 0) {

        return;
    }

    const party = sinkResult.data[0].resultData;
    const partyData = party.body;
    const doc = getIdentityDocument(partyData);
    const address = getPartyAddress(partyData);

    sinkExchange.partyId = party.partyId;
    sinkExchange.identityDoc = {};
    sinkExchange.identityDoc.docTypeDesc = doc.docType?.docTypeDesc;
    sinkExchange.identityDoc.issuerName = doc.issuerName;
    sinkExchange.identityDoc.issueDate = doc.issueDate;
    sinkExchange.identityDoc.issuerCode = doc.issuerCode;
    sinkExchange.registrationAddress = address;
};

function getPartyAddress(partyData) {

    const currentDate = dateTimeUtils.dateNow();

    const registrationAddress = partyData.partyAddresses.find(
        (x) => x.addressType.addressTypeCode === partyConstants.addressType.registration.code
            && x.actualFrom <= currentDate
            && (!x.actualTo || x.actualTo >= currentDate));

    if (registrationAddress) {

        return registrationAddress.fullAddress.value;
    }

    return "";
}

function getIdentityDocument(partyData) {

    const currentDate = dateTimeUtils.dateNow();
    const identityDocs = partyData.partyDocuments.filter(
        (x) => x.docType.docTypeClass === 'identity'
            && x.issueDate <= currentDate
            && (!x.expireDate || x.expireDate >= currentDate));

    const passport = identityDocs.find((x) => x.docType.docTypeCode === partyConstants.partyDocumentType.passport);
    const foreignPassport = identityDocs.find((x) => x.docType.docTypeCode === partyConstants.partyDocumentType.foreignCitPassport);

    if (passport) {

        return passport;
    }
    else if (foreignPassport) {

        return foreignPassport;
    }
    else if (identityDocs.length > 0) {

        return identityDocs[0];
    }

    return {};
}
