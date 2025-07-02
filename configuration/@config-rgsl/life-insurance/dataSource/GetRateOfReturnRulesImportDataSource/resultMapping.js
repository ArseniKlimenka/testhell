'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.excelRowNumber = input.EXCEL_ROW_NUMBER;
    output.productCode = input.PRODUCT_CODE;
    output.strategyCode = input.STRATEGY_CODE;
    output.issueDateFrom = input.ISSUE_DATE_FROM;
    output.issueDateTo = input.ISSUE_DATE_TO;
    output.issueDateStr = input.ISSUE_DATE_STR;
    output.insuranceTerms = input.INSURANCE_TERMS;
    output.currencyCode = input.CURRENCY_CODE;
    output.guaranteedIncome = input.GUARANTEED_INCOME;
    output.variant = input.VARIANT;
    output.rateOfReturn = input.RATE_OF_RETURN;
    output.cashback = input.CASHBACK;
    output.rko = input.RKO;
    output.participationCoeff = input.PARTICIPATION_COEFF;
    output.manualRate = input.MANUAL_RATE;
    output.importDocumentId = input.IMPORT_DOCUMENT_ID;
    output.version = input.CONF_VERSION;
    output.loadedBy = input.LOADED_BY;
    output.loadDate = input.LOAD_DATE;

    return output;
};
