module.exports = function resultMapping(input) {

    return {
        contractNumber: input.CONTRACT_NUMBER,
        dueDate: input.DUE_DATE,
        objectCode: input.OBJECT_CODE,
        itemNo: input.ITEM_NO,
        postingDate: input.POSTING_DATE,
        deadlineDate: input.DEADLINE_DATE,
        overdueDays: input.OVERDUE_DAYS,
        amount: input.AMOUNT,
        openAmount: input.OPEN_AMOUNT,
        openAmountNoRsd: input.OPEN_AMOUNT_NO_RSD,
        rsdRate: input.RSD_RATE,
    };
};
