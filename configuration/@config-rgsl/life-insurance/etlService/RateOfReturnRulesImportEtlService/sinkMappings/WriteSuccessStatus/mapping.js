'use strict';

module.exports = function mapping(lineInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkExchange.globalContext?.counters?.errorCount > 0) {
        return;
    }

    const rateOfReturnRules = additionalDataSourcesResults?.GetRateOfReturnRulesDataSource?.data?.map(i => i.resultData) ?? [];
    const maxVersion = rateOfReturnRules[0]?.version ?? 0;

    const lineData = lineInput.data;
    const nextVersion = maxVersion + 1;

    const recordStatus = {
        IMPORT_DOCUMENT_ID: lineInput.importDocumentId,
        SOURCE_ID: lineInput.sourceId,
        RECORD_KEY: lineInput.recordKey,
        STATUS: 1,
        RESULT_ENTITY_ID: lineInput.importDocumentId,
        RESULT_SUMMARY: {
            excelRowNumber: lineData.excelRowNumber,
            productCode: lineData.productCode,
            strategyCode: lineData.strategyCode,
            issueDateFrom : lineData.issueDateFrom,
            issueDateTo : lineData.issueDateTo,
            insuranceTerms : lineData.insuranceTerms,
            currencyCode : lineData.currencyCode,
            guaranteedIncome : lineData.guaranteedIncome,
            version: nextVersion
        }
    };

    return {
        'BFX.IMPORT_RECORD_STATUS': [recordStatus]
    };
};
