'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.investmentProfitRowId = input.INV_PROFIT_ROW_ID;
    output.importDocumentId = input.IMPORT_DOCUMENT_ID;
    output.contractNumber = input.CONTRACT_NUMBER;
    output.investmentProfitCalculationDate = input.INV_PROFIT_CALC_DATE;
    output.investmentProfitRate = input.INV_PROFIT_RATE;
    output.investmentProfitPaymentTypeCode = input.INV_PROFIT_PAY_TYPE_CODE;
    output.loadDate = input.LOAD_DATE;
    output.investmentProfitPaymentTypeDescription = input.PAYMENT_TYPE_DESCRIPTION;
    output.recordState = input.IS_PAID ? "Paid" : input.IS_CANCELLED ? "Draft" : "Allocated";

    return output;
};
