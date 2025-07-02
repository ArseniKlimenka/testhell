'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.amendmentNumber = input.AMENDMENT_NUMBER;
    output.contractNumber = input.CONTRACT_NUMBER;
    output.recipientPartyCode = input.RECIPIENT_PARTY_CODE;
    output.recipientPaymentTypeCode = input.PAYMENT_TYPE_CODE;

    return output;
};
