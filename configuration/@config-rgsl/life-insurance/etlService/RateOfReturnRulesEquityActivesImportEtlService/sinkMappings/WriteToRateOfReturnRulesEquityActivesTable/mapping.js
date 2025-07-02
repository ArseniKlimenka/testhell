'use strict';

const { LocalDateTime } = require('@js-joda/core');

module.exports = function mapping(lineInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkExchange.globalContext?.counters?.errorCount > 0) {
        return;
    }

    const rateOfReturnRulesEquityActives = additionalDataSourcesResults?.GetRateOfReturnRulesEquityActivesImportDataSource?.data?.map(i => i.resultData) ?? [];
    const maxVersion = rateOfReturnRulesEquityActives[0]?.version ?? 0;

    const lineData = lineInput.data;
    const nextVersion = maxVersion + 1;

    const recordStatus = {
        EXCEL_ROW_NUMBER: lineData.excelRowNumber,
        PRODUCT_CODE: lineData.productCode,
        INSURANCE_TERMS: lineData.insuranceTerms,
        ISSUE_DATE_FROM : lineData.issueDateFrom,
        ISSUE_DATE_TO : lineData.issueDateTo,
        ISSUE_DATE_STR : lineData.issueDateStr,
        MANUAL_RATE: lineData.manualRate,
        INVESTMENT_FREQUENCY: lineData.investmentFrequency,
        MF: lineData.mf,
        COSTS_OPEN_CONTRACTS: lineData.costsOpenContracts,
        COMM_WITHDRAWAL_FUNDS: lineData.commWithdrawalFunds,
        RKO: lineData.rko,
        IS_STANDARD_CONTRACT_CONDITIONS: lineData.isStandardContractConditions,
        IS_COORDINATION_UD_REQUIRED: lineData.isCoordinationUDRequired,
        IMPORT_DOCUMENT_ID: lineInput.importDocumentId,
        CONF_VERSION: nextVersion,
        LOADED_BY: this.applicationContext.originatingUser.username,
        LOAD_DATE: LocalDateTime.now().toString()
    };

    return {
        'BFX_IMPL.RATE_OF_RETURN_EQUITY_ACTIVES': [recordStatus]
    };

};
