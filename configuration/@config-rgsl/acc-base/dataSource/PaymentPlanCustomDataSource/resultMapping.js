module.exports = function resultMapping(input) {
    return {
        isFirstInstallment: input.IS_FIRST_INSTALLMENT,
        dueDate: input.DUE_DATE,
        contractNo: input.CONTRACT_NO,
        currencyCode: input.CURRENCY_CODE,
        amount: input.AMOUNT,
        openAmount: input.OPEN_AMOUNT,
        isPosted: input.IS_POSTED,
    };
};
