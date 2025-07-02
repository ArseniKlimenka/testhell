module.exports = function resultMapping(input) {

    return {
        pairNo: input.PAIR_NO,
        documentNo: input.DOCUMENT_NO,
        sourceLineId: input.SOURCE_LINE_ID,
        entryDate: input.ENTRY_DATE,
        transactionTypeId: input.TRANSACTION_TYPE_ID,
        storno: input.IS_STORNO ? 'Сторно' : '',
        debitCredit: input.DEBIT_CREDIT,
        epsAccount: input.EPS_ACCOUNT,
        epsAccount20: input.EPS_ACCOUNT_20,
        glAccount: input.GL_ACCOUNT,
        postingAmount: input.POSTING_AMOUNT,
        llob: input.LLOB,
        ksp: input.KSP,
    };

};
