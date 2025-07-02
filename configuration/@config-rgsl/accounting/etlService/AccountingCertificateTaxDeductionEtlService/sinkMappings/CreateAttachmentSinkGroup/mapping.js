const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { accCertificateIncomingSource } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { AccountingCertificateDocNameConsts } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function mapping(lineInput, sinkExchange) {

    const result = {
        documentId: lineInput.documentId,
        configurationName: AccountingCertificateDocNameConsts.AccountingCertificate,
        documentNo: lineInput.documentNo,
        accountingYear: lineInput.accountingYear,
        correctionNumber: parseInt(lineInput.correctionNumber ?? 0),
        contractNumber: lineInput.contractNumber
    };

    return result;
};
