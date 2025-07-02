'use strict';

module.exports = function mapping(lineInput, sinkExchange) {

    if (sinkExchange.globalContext?.counters?.errorCount > 0) {
        return;
    }

    const lineData = lineInput.data;
    const nextVersion = sinkExchange.maxVersion + 1;

    const recordStatus = {
        IMPORT_DOCUMENT_ID: lineInput.importDocumentId,
        CONTRACT_NUMBER: lineData.contractNumber,
        POLICY_YEAR_NUMBER: lineData.policyYearNumber,
        REINSURER_SHARE: lineData.reinsurerShare,
        REINSURER_CODE: lineData.reinsurerCode,
        REINSURANCE_NUMBER: lineData.reinsuranceNumber,
        VERSION: nextVersion
    };

    return {
        'PAS_IMPL.REINSURANCE': [recordStatus]
    };

};
