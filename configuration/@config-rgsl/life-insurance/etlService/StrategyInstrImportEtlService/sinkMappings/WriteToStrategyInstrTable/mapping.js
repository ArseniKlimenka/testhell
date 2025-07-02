'use strict';

const { LocalDateTime } = require('@js-joda/core');

module.exports = function mapping(lineInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkExchange.globalContext?.counters?.errorCount > 0) {
        return;
    }

    const strategyInstrConfigs = additionalDataSourcesResults?.GetStrategyInstrDataSource?.data?.map(i => i.resultData) ?? [];
    const maxVersion = strategyInstrConfigs[0]?.version ?? 0;

    const lineData = lineInput.data;
    const nextVersion = maxVersion + 1;

    const recordStatus = {
        EXCEL_ROW_NUMBER: lineData.excelRowNumber,
        PRODUCT_CODE: lineData.productCode,
        STRATEGY_CODE: lineData.strategyCode,
        ISSUE_DATE_FROM : lineData.issueDateFrom,
        ISSUE_DATE_TO : lineData.issueDateTo,
        ISSUE_DATE_STR : lineData.issueDateStr,
        PRODUCT_DESCRIPTION: lineData.productDescription,
        STRATEGY_DESCRIPTION_FULL: lineData.strategyDescriptionFull,
        PURCHASE_DATE: lineData.purchaseDate,
        DISCHARGE_DATE: lineData.dischargeDate,
        DID_BEGIN_DATE: lineData.didBeginDate,
        DID_END_DATE: lineData.didEndDate,
        COUPON_PERIODS: lineData.couponPeriods,
        WINDOW_START_DATE: lineData.windowStartDate,
        WINDOW_END_DATE: lineData.windowEndDate,
        IMPORT_DOCUMENT_ID: lineInput.importDocumentId,
        CONF_VERSION: nextVersion,
        LOADED_BY: this.applicationContext.originatingUser.username,
        LOAD_DATE: LocalDateTime.now().toString()
    };

    return {
        'BFX_IMPL.STRATEGY_INSTRUMENTS': [recordStatus]
    };

};
