'use strict';

const { nullCheck, convertToBoolean } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function resultMapping(input) {

    const output = {};

    output.endowmentNumber = nullCheck(input.ENDOWMENT_NUMBER);
    output.contractNumber = nullCheck(input.CONTRACT_NUMBER);
    output.riskCode = nullCheck(input.RISK_CODE);
    output.riskDescription = nullCheck(input.RISK_DESCRIPTION);
    output.statementReceivedDate = nullCheck(input.STATEMENT_RECEIVED_DATE);
    output.contractCurrency = nullCheck(input.CONTRACT_CURRENCY);
    output.amountInContractCurrency = nullCheck(input.AMOUNT_IN_CONTRACT_CURRENCY) ? parseFloat(input.AMOUNT_IN_CONTRACT_CURRENCY) : undefined;
    output.amountInRub = nullCheck(input.AMOUNT_IN_RUB) ? parseFloat(input.AMOUNT_IN_RUB) : undefined;
    output.pitInContractCurrency = nullCheck(input.PIT_DOC_CURR) ? parseFloat(input.PIT_DOC_CURR) : undefined;
    output.pitInRub = nullCheck(input.PIT_RUB_CURR) ? parseFloat(input.PIT_RUB_CURR) : undefined;
    output.beneficiaryPartyCode = nullCheck(input.BENEFICIARY_PARTY_CODE);
    output.shouldUseNetting = !!nullCheck(input.SHOULD_USE_NETTING);
    output.nonAcceptance = !!nullCheck(input.NON_ACCEPTANCE);
    output.numberOfNonAcceptancePayment = nullCheck(input.NON_ACCEPTANCE_PAYMENT_NUMBER);
    output.paymentBankAccountNumber = nullCheck(input.BANK_ACCOUNT_NUMBER);
    output.paymentTypeCode = nullCheck(input.PAYMENT_TYPE_CODE);
    output.fixedExchangeRate = nullCheck(input.FIXED_EXCHANGE_RATE) ? parseFloat(input.FIXED_EXCHANGE_RATE) : undefined;
    output.useFixedExchangeRate = convertToBoolean(input.USE_FIXED_EXCH_RATE);
    output.amountToPayPercentage = nullCheck(input.AMOUNT_TO_PAY_PERCENTAGE);

    if (input.PAYMENT_LINES) {

        const json = JSON.parse(input.PAYMENT_LINES);
        output.paymentLines = json;
    }

    return output;
};
