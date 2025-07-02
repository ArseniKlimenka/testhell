'use strict';

const { LocalDateTime } = require('@js-joda/core');

module.exports = function mapping(lineInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkExchange.globalContext?.counters?.errorCount > 0) {
        return;
    }

    const rateOfReturnRules = additionalDataSourcesResults?.GetRateOfReturnRulesDataSource?.data?.map(i => i.resultData) ?? [];
    const maxVersion = rateOfReturnRules[0]?.version ?? 0;

    const lineData = lineInput.data;
    const nextVersion = maxVersion + 1;

    const recordStatus = {
        EXCEL_ROW_NUMBER: lineData.excelRowNumber,
        PRODUCT_CODE: lineData.productCode,
        STRATEGY_CODE: lineData.strategyCode,
        ISSUE_DATE_FROM : lineData.issueDateFrom,
        ISSUE_DATE_TO : lineData.issueDateTo,
        ISSUE_DATE_STR : lineData.issueDateStr,
        INSURANCE_TERMS: lineData.insuranceTerms,
        CURRENCY_CODE: lineData.currencyCode,
        GUARANTEED_INCOME: lineData.guaranteedIncome,
        VARIANT: lineData.variant,
        RATE_OF_RETURN: lineData.rateOfReturn,
        CASHBACK: lineData.cashback,
        RKO: lineData.rko,
        PARTICIPATION_COEFF: lineData.participationCoeff,
        MANUAL_RATE: lineData.manualRate,
        IMPORT_DOCUMENT_ID: lineInput.importDocumentId,
        CONF_VERSION: nextVersion,
        LOADED_BY: this.applicationContext.originatingUser.username,
        LOAD_DATE: LocalDateTime.now().toString()
    };

    return {
        'BFX_IMPL.RATE_OF_RETURN': [recordStatus]
    };

};
