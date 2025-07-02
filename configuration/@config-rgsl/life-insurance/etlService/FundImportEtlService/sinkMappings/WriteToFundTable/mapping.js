'use strict';

const {
    LocalDateTime
} = require('@js-joda/core');

module.exports = function mapping(lineInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkExchange.globalContext?.counters?.errorCount > 0) {
        return;
    }

    const funds = additionalDataSourcesResults?.GetFundImportDataSource?.data?.map(i => i.resultData) ?? [];
    const maxVersion = funds[0]?.confVersion ?? 0;

    const lineData = lineInput.data;
    const nextVersion = maxVersion + 1;

    const recordStatus = {
        EXCEL_ROW_NUMBER: lineData.excelRowNumber,
        ROW_NUMBER: lineData.rowNumber,
        DOCUMENT_NUMBER: lineData.documentNumber,
        FUND_STATUS: lineData.fundStatus,
        NET_ASSETS_AMOUNT: lineData.netAssetsAmount,
        FREE_MONEY: lineData.freeMoney,
        NUMBER_OF_UNITS: lineData.numberOfUnits,
        UNIT_CURRENT_AMOUNT: lineData.unitCurrentAmount,
        REPORT_DATE: lineData.reportDate,
        REPORT_DATE_VERSION: sinkExchange.reportDateVersion,
        IMPORT_DOCUMENT_ID: lineInput.importDocumentId,
        CONF_VERSION: nextVersion,
        LOADED_BY: this.applicationContext.originatingUser.username,
        LOAD_DATE: LocalDateTime.now().toString()
    };

    return {
        'BFX_IMPL.FUND': [recordStatus]
    };

};
