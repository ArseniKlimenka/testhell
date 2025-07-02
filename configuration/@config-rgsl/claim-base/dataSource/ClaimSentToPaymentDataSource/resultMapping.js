'use strict';

module.exports = function resultMapping(input) {

    const empty = '';

    const output = {};

    output.ieNumber = input.IE_NUMBER ?? empty;
    output.claimNumber = input.CLAIM_NUMBER ?? empty;
    output.insuranceAct = input.INSURANCE_ACT ?? empty;
    output.baseDocRecipientName = input.BASE_DOC_RECIPIENT_NAME ?? empty;
    output.insuranceActSignatureDateTime = input.INSURANCE_ACT_SIGNATURE_DATE_TIME ?? empty;
    output.paymentOrderNumber = input.PO_NUMBER ?? empty;
    output.paymentOrderCreatedDateTime = input.PO_CREATED_DATE_TIME ?? empty;
    output.paymentOrderToPayDateTime = input.PO_TO_PAY_DATE_TIME ?? empty;
    output.paymentOrderOriginalTotalAmount = input.PO_CURRENCY_AMOUNT ? input.PO_CURRENCY_AMOUNT.toString() : empty;
    output.paymentOrderTotalNettedAmount = input.TOTAL_NETTED_AMOUNT ?? empty;
    output.claimState = input.CLAIM_STATE ?? empty;
    output.claimLoadDateTime = input.CLAIM_LOAD_DATE_TIME ?? empty;

    return output;
};
