'use strict';

const { nullCheck, convertToBoolean } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function resultMapping(input) {

    const output = {};

    output.contractNumber = nullCheck(input.CONTRACT_NUMBER);
    output.amendmentNumber = nullCheck(input.AMENDMENT_NUMBER);
    output.amendmentConfName = nullCheck(input.AMENDMENT_CODE_NAME);
    output.amendmentIssueDate = nullCheck(input.AMENMDENT_ISSUE_DATE);
    output.cancellationReason = nullCheck(input.CANCELLATION_REASON);
    output.policyCurrency = nullCheck(input.POLICY_CURRENCY);
    output.recipientPartyCode = nullCheck(input.RECIPIENT_PARTY_CODE);
    output.recipientAmountDocCurrency = nullCheck(input.AMOUNT_IN_CONTRACT_CURRENCY);
    output.recipientAmountRubCurrency = nullCheck(input.AMOUNT_IN_RUB);
    output.recipientPitAmountDocCurrency = nullCheck(input.PIT_DOC_CURR);
    output.recipientPitAmountRubCurrency = nullCheck(input.PIT_RUB_CURR);
    output.recipientAmountPercentage = nullCheck(input.AMOUNT_TO_PAY_PERCENT);
    output.fixedExchangeRate = nullCheck(input.FIXED_EXCH_RATE) ? parseFloat(input.FIXED_EXCH_RATE) : undefined;
    output.useFixedExchangeRate = convertToBoolean(input.USE_FIXED_EXCH_RATE);
    output.paymentBankAccountNumber = nullCheck(input.BANK_ACCOUNT_NUMBER);

    if (input.PAYMENT_LINES) {
        const json = JSON.parse(input.PAYMENT_LINES);
        output.paymentLines = json;
    }

    return output;
};
