module.exports = function resultMapping(input) {

    return {
        contractNumber: input.CONTRACT_NUMBER,
        dueDate: input.DUE_DATE,
        objectCode: input.OBJECT_CODE,
        itemNo: input.ITEM_NO,
        amount: input.AMOUNT,
        openAmount: input.OPEN_AMOUNT,
    };
};
