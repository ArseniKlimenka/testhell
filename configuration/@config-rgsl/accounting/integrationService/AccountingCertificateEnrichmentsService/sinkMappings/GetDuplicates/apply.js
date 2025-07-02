"use strict";

const {
    checkDuplicateLastCorrectionNumber
} = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const currentAccountingCertificateNumber = sinkExchange.currentCertificateNumber ?? null;

    if ((sinkResult?.data?.length ?? 0) === 0) {
        return;
    }

    const resultDuplicates = sinkResult.data.filter(i => i.resultData.accountingCertificateNumber != currentAccountingCertificateNumber);

    const duplicates = resultDuplicates.map(item => {
        return {
            accountingCertificateNumber: item.resultData.accountingCertificateNumber,
            accountingCertificateState: item.resultData.accountingCertificateState,
            originalDocumentNumber: item.resultData.originalDocumentNumber
        };
    });

    checkDuplicateLastCorrectionNumber(duplicates);
};
