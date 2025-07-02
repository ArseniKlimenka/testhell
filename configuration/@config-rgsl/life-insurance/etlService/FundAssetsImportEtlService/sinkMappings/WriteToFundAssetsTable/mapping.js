'use strict';

const {
    LocalDateTime
} = require('@js-joda/core');

module.exports = function mapping(lineInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkExchange.globalContext?.counters?.errorCount > 0) {
        return;
    }

    const fundsAssets = additionalDataSourcesResults?.GetFundAssetsImportDataSource?.data?.map(i => i.resultData) ?? [];
    const maxVersion = fundsAssets[0]?.confVersion ?? 0;

    const lineData = lineInput.data;
    const nextVersion = maxVersion + 1;

    const recordStatus = {
        EXCEL_ROW_NUMBER: lineData.excelRowNumber,
        ROW_NUMBER: lineData.rowNumber,
        DOCUMENT_NUMBER: lineData.documentNumber,
        ASSET_TYPE: lineData.assetType,
        ASSET_NAME: lineData.assetName,
        ISIN: lineData.isin,
        ASSET_CURRENT_SHARE: lineData.assetCurrentShare,
        ASSET_PURCHASE_PRICE_AVG: lineData.assetPurchasePriceAvg,
        STOCK_PURCHASED_NUMBER: lineData.stockPurchasedNumber,
        ASSET_AMOUNT_ON_PURCHASE_TIME: lineData.assetAmountOnPurchaseTime,
        ASSET_PRICE_ON_GENERATION_REPORT_DATE: lineData.assetPriceOnGenerationReportDate,
        ASSETS_AMOUNT_ON_GENERATION_REPORT_DATE: lineData.assetsAmountOnGenerationReportDate,
        COUPON_RATE: lineData.couponRate,
        ACCUMULATED_COUPON_INCOME: lineData.accumulatedCouponIncome,
        REPORT_DATE: lineData.reportDate,
        REPORT_DATE_VERSION: sinkExchange.reportDateVersion,
        IMPORT_DOCUMENT_ID: lineInput.importDocumentId,
        CONF_VERSION: nextVersion,
        LOADED_BY: this.applicationContext.originatingUser.username,
        LOAD_DATE: LocalDateTime.now().toString()
    };

    return {
        'BFX_IMPL.FUND_ASSETS': [recordStatus]
    };

};
