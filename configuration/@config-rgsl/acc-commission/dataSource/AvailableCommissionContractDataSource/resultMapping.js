module.exports = function resultMapping(input) {

    return {
        aaExternalNumber: input.AA_EXTERNAL_NUMBER,
        agent: input.AGENT,
        contractNumber: input.CONTRACT_NUMBER,
        contractStateCode: input.CONTRACT_STATE_CODE,
        installmentStatus: input.INSTALLMENT_STATUS,
        transactionDate: input.TRANSACTION_DATE,
        verificationState: input.VERIFICATION_STATE,
    };
};
