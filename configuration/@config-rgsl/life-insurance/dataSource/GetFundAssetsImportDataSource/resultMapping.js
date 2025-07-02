'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function resultMapping(input) {

    const output = {};

    output.excelRowNumber = input.EXCEL_ROW_NUMBER;
    output.rowNumber = input.ROW_NUMBER;
    output.documentNumber = input.DOCUMENT_NUMBER;
    output.assetType = input.ASSET_TYPE;
    output.assetName = input.ASSET_NAME;
    output.isin = input.ISIN;
    output.assetCurrentShare = input.ASSET_CURRENT_SHARE;
    output.assetPurchasePriceAvg = input.ASSET_PURCHASE_PRICE_AVG;
    output.stockPurchasedNumber = input.STOCK_PURCHASED_NUMBER;
    output.assetAmountOnPurchaseTime = input.ASSET_AMOUNT_ON_PURCHASE_TIME;
    output.assetPriceOnGenerationReportDate = input.ASSET_PRICE_ON_GENERATION_REPORT_DATE;
    output.assetsAmountOnGenerationReportDate = input.ASSETS_AMOUNT_ON_GENERATION_REPORT_DATE;
    output.couponRate = input.COUPON_RATE;
    output.accumulatedCouponIncome = input.ACCUMULATED_COUPON_INCOME;
    output.reportDate = DateTimeUtils.formatDate(input.REPORT_DATE, DateTimeUtils.DateFormats.ECMASCRIPT);
    output.reportDateVersion = input.REPORT_DATE_VERSION;
    output.importDocumentId = input.IMPORT_DOCUMENT_ID;
    output.confVersion = input.CONF_VERSION;
    output.loadedBy = input.LOADED_BY;
    output.loadDate = input.LOAD_DATE;

    return output;
};
