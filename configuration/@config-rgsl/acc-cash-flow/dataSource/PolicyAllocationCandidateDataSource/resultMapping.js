module.exports = function resultMapping(input) {

    return {
        configurationName: input.CODE_NAME,
        documentNo: input.DOCUMENT_NO,
        currencyCode: input.CURRENCY_CODE,
        startDate: input.START_DATE,
        productCode: input.PRODUCT_CODE,
        productDescription: input.PRODUCT_DESCRIPTION,
        policyHolder: input.HOLDER_NAME,
        policyHolderCode: input.HOLDER_CODE,
        debtAmount: input.DEBT_AMOUNT,
        openDebtAmount: input.OPEN_DEBT_AMOUNT
    };
};
