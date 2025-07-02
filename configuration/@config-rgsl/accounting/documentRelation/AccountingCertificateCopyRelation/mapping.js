'use strict';

const { getCertificateSource } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function mapping(initialDocument) {

    const applicationContext = this.applicationContext;
    const originatingClientId = applicationContext?.originatingClientId;
    const originatingUserName = applicationContext?.originatingUser?.username;

    const updatedDocument = Object.assign({}, initialDocument);
    updatedDocument.correctionNumber = 0;
    updatedDocument.accountingCertificateIncomeSource = getCertificateSource(originatingClientId, originatingUserName);
    updatedDocument.accountingYear.year = undefined;
    updatedDocument.technicalInformation.isCopy = true;
    updatedDocument.technicalInformation.copiedFrom = this.businessContext.documentNumber;
    updatedDocument.paymentContract.isManualCorrectionSum = false;
    updatedDocument.paymentContract.amountOfPremiumsPaid = undefined;

    return { body: updatedDocument };
};
