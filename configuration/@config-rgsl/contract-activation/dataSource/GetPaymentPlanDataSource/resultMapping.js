module.exports = function resultMapping(input) {

    return {
        contractNumber: input.CONTRACT_NUMBER,
        amendmentNumber: input.AMENDMENT_NUMBER,
        dueDate: input.DUE_DATE,
        postingDate: input.POSTING_DATE,
        objectCode: input.OBJECT_CODE,
        itemNo: input.ITEM_NO,
        currencyCode: input.CURRENCY_CODE,
        insuranceYear: input.INSURANCE_YEAR,
        baseAmount: input.BASE_AMOUNT,
        postedAmount: input.POSTED_AMOUNT,
        openAmount: input.OPEN_AMOUNT,
    };
};
