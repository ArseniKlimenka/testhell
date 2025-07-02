module.exports = function resultMapping(input) {
    return {
        dueDate: input.DUE_DATE,
        contractNo: input.CONTRACT_NO,
        currencyCode: input.CURRENCY_CODE,
        installmentSum: input.INSTALLMENT_SUM,
        planAmount: input.PLAN_AMOUNT,
        underpaymentSum: input.UNDERPAYMENT_SUM,
        overpaymentSum: input.OVERPAYMENT_SUM
    };
};
