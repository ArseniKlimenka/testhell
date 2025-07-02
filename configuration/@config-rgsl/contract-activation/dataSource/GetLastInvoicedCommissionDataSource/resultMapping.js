module.exports = function resultMapping(input) {

    return {
        contractNumber: input.CONTRACT_NUMBER,
        dueDate: input.DUE_DATE,
        postingDate: input.POSTING_DATE,
        objectCode: input.OBJECT_CODE,
        itemNo: input.ITEM_NO,
        currencyCode: input.CURRENCY_CODE,
        baseAmount: input.BASE_AMOUNT,
        aaCommRate: input.AA_COMM_RATE,
        docCommRate: input.DOC_COMM_RATE,
        calcCommAmount: input.CALC_COMM_AMOUNT,
    };
};
