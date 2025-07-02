'use strict';
const { objectToString } = require('@config-rgsl/life-insurance/lib/excelImportHelper');
const { couponPeriods } = require('@config-rgsl/life-insurance/lib/strategyInstrHelper');

module.exports = function resultMapping(input) {

    const output = {};

    const attributesToString = [...couponPeriods];
    objectToString(input, attributesToString);

    output.excelRowNumber = input.EXCEL_ROW_NUMBER;
    output.issueDateFrom = input.ISSUE_DATE_FROM;
    output.issueDateTo = input.ISSUE_DATE_TO;
    output.issueDateStr = input.ISSUE_DATE_STR;
    output.productCode = input.PRODUCT_CODE;
    output.strategyCode = input.STRATEGY_CODE;
    output.productDescription = input.PRODUCT_DESCRIPTION;
    output.strategyDescriptionFull = input.STRATEGY_DESCRIPTION_FULL;
    output.purchaseDate = input.PURCHASE_DATE;
    output.dischargeDate = input.DISCHARGE_DATE;
    output.didBeginDate = input.DID_BEGIN_DATE;
    output.didEndDate = input.DID_END_DATE;
    output.couponPeriods = input.COUPON_PERIODS;
    output.windowStartDate = input.WINDOW_START_DATE;
    output.windowEndDate = input.WINDOW_END_DATE;
    output.importDocumentId = input.IMPORT_DOCUMENT_ID;
    output.version = input.CONF_VERSION;
    output.loadedBy = input.LOADED_BY;
    output.loadDate = input.LOAD_DATE;

    return output;
};
