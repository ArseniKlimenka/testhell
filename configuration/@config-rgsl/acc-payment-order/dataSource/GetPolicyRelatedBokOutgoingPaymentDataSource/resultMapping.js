'use strict';

module.exports = function resultMapping(input) {

    const output = {
        contractNumber: input.CONTRACT_NUMBER,
        payoutType: input.PAYOUT_TYPE,
        collectionNumber: input.COLLECTION_NUMBER,
        claimNumber: input.CLAIM_NUMBER,
        actNumber: input.ACT_NUMBER,
        paymentDate: input.PAYMENT_DATE,
        payoutAmountLc: input.PAYOUT_AMOUNT_LC,
    };

    return output;
};
