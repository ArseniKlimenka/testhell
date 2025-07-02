'use strict';

module.exports = function mapping(lineInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkExchange.globalContext?.counters?.errorCount > 0) {
        return;
    }

    const rateOfReturnRulesEquityActives = additionalDataSourcesResults?.GetRateOfReturnRulesEquityActivesDataSource?.data?.map(i => i.resultData) ?? [];
    const maxVersion = rateOfReturnRulesEquityActives[0]?.version ?? 0;

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
            insuranceTerms: lineData.insuranceTerms,
            issueDate: lineData.issueDate,
            manualRate: lineData.manualRate,
            investmentFrequency: lineData.investmentFrequency,
            mf: lineData.mf,
            costsOpenContracts: lineData.costsOpenContracts,
            commWithdrawalFunds: lineData.commWithdrawalFunds,
            rko: lineData.rko,
            isStandardContractConditions: lineData.isStandardContractConditions,
            isCoordinationUDRequired: lineData.isCoordinationUDRequired,
            version: nextVersion
        }
    };

    return {
        'BFX.IMPORT_RECORD_STATUS': [recordStatus]
    };
};
