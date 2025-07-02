'use static';

const { AccountingCertificateDocNameConsts, AccountingCertificateRelationNameConsts, configurationVersion } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function mapping(input, sinkExchange) {

    if (!sinkExchange.isCorrectionCreation || sinkExchange.error) {
        return;
    }

    sinkExchange.lastCorrectionNumber++;
    sinkExchange.certificateBody.correctionNumber = sinkExchange.lastCorrectionNumber;

    return {
        businessNumber: sinkExchange?.businessNumber,
        relation: {
            relationName: AccountingCertificateRelationNameConsts.AccountingCertificateCreateAmendmentRelation,
            configurationName: AccountingCertificateDocNameConsts.AccountingCertificate,
            configurationVersion: configurationVersion
        },
        body: sinkExchange?.certificateBody
    };
};
