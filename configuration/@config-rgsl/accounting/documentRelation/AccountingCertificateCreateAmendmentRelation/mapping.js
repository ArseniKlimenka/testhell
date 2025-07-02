'use strict';

const { getCertificateSource } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function mapping(initialDocument) {

    const applicationContext = this.applicationContext;
    const originatingClientId = applicationContext?.originatingClientId;
    const originatingUserName = applicationContext?.originatingUser?.username;

    const updatedDocument = Object.assign({}, initialDocument);
    updatedDocument.accountingCertificateIncomeSource = getCertificateSource(originatingClientId, originatingUserName);
    updatedDocument.correctionNumber = initialDocument.correctionNumber + 1;
    updatedDocument.technicalInformation.isCopy = false;
    updatedDocument.technicalInformation.copiedFrom = undefined;
    updatedDocument.comment = undefined;
    updatedDocument.accountingCertificateEnrichments = {};
    updatedDocument.accountingCertificateEnrichments.enrichFields = ["**/**"];
    return { body: updatedDocument };
};
