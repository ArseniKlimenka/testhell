'use strict';

module.exports = function resultMapping(input) {

    return {
        bankBic: input.BIC,
        bankCorrespondentAccount: input.CORR_ACCOUNT,
        bankAccountNumber: input.ACCOUNT_NUMBER,
        payAmountSum: input.PAY_AMOUNT_SUM,
        contractSeries: input.CONTRACT_SERIES,
        contractNumber: input.CONTRACT_NUMBER,
        closeDate: input.CLOSE_DATE
    };

};
