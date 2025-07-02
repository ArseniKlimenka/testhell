'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

const {
    arrayAttributesArr,
    couponPeriods
} = require('@config-rgsl/life-insurance/lib/strategyInstrHelper');

const {
    parseJSONconfig
} = require('@config-rgsl/life-insurance/lib/excelImportHelper');

module.exports = function resultMapping(input) {

    const output = {};

    output.excelRowNumber = input.EXCEL_ROW_NUMBER;
    output.issueDateFrom = DateTimeUtils.formatDate(input.ISSUE_DATE_FROM, DateTimeUtils.DateFormats.ECMASCRIPT);
    output.issueDateTo = DateTimeUtils.formatDate(input.ISSUE_DATE_TO, DateTimeUtils.DateFormats.ECMASCRIPT);
    output.issueDateStr = input.ISSUE_DATE_STR;
    output.productCode = input.PRODUCT_CODE;
    output.strategyCode = input.STRATEGY_CODE;
    output.productDescription = input.PRODUCT_DESCRIPTION;
    output.strategyDescriptionFull = input.STRATEGY_DESCRIPTION_FULL;
    output.purchaseDate = DateTimeUtils.formatDate(input.PURCHASE_DATE, DateTimeUtils.DateFormats.ECMASCRIPT);
    output.dischargeDate = DateTimeUtils.formatDate(input.DISCHARGE_DATE, DateTimeUtils.DateFormats.ECMASCRIPT);
    output.didBeginDate = DateTimeUtils.formatDate(input.DID_BEGIN_DATE, DateTimeUtils.DateFormats.ECMASCRIPT);
    output.didEndDate = DateTimeUtils.formatDate(input.DID_END_DATE, DateTimeUtils.DateFormats.ECMASCRIPT);
    output.couponPeriods = input.COUPON_PERIODS;
    output.windowStartDate = DateTimeUtils.formatDate(input.WINDOW_START_DATE, DateTimeUtils.DateFormats.ECMASCRIPT);
    output.windowEndDate = DateTimeUtils.formatDate(input.WINDOW_END_DATE, DateTimeUtils.DateFormats.ECMASCRIPT);
    output.importDocumentId = input.IMPORT_DOCUMENT_ID;
    output.version = input.CONF_VERSION;
    output.loadedBy = input.LOADED_BY;
    output.loadDate = input.LOAD_DATE;

    const attributesToParse = [...arrayAttributesArr, ...couponPeriods];
    parseJSONconfig(output, attributesToParse);

    return output;
};
