'use strict';

const { nullCheck, convertToBoolean } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function resultMapping(input) {

    const output = {};

    output.claimNumber = nullCheck(input.CLAIM_NUMBER);
    output.contractNumber = nullCheck(input.CONTRACT_NUMBER);
    output.riskCode = nullCheck(input.RISK_CODE);
    output.riskDescription = nullCheck(input.RISK_DESCRIPTION);
    output.contractCurrency = nullCheck(input.CONTRACT_CURRENCY);
    output.shouldUseNetting = convertToBoolean(input.SHOULD_USE_NETTING);
    output.nonAcceptance = convertToBoolean(input.NON_ACCEPTANCE);
    output.numberOfNonAcceptancePayment = nullCheck(input.NON_ACCEPTANCE_PAYMENT_NUMBER);
    output.fixedExchangeRate = nullCheck(input.FIXED_EXCH_RATE);
    output.useFixedExchangeRate = convertToBoolean(input.USE_FIXED_EXCH_RATE);
    output.holderPartyCode = nullCheck(input.HOLDER_PARTY_CODE);
    output.amountInContractCurrency = nullCheck(input.PAYMENT_AMOUNT_DOC_CUR) ? parseFloat(input.PAYMENT_AMOUNT_DOC_CUR) : undefined;
    output.amountInRub = nullCheck(input.PAYMENT_AMOUNT_RUB_CUR) ? parseFloat(input.PAYMENT_AMOUNT_RUB_CUR) : undefined;

    return output;
};
