'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.paymentOrderNumber = input.PAYMENT_ORDER_NUMBER;
    output.documentNumber = input.DOCUMENT_NUMBER;
    output.initialOpenAmount = input.INITIAL_OPEN_AMOUNT;
    output.documentCurrency = input.DOCUMENT_CURRENCY;
    output.exchangeRate = input.EXCHANGE_RATE;
    output.nettedAmount = input.NETTED_AMOUNT;
    output.nettedAmountInDocCurrency = input.NETTED_AMOUNT_DOC_CUR;
    output.bankStatementId = input.BANK_STATEMENT_ID;
    output.paymentOrderDate = input.PAYMENT_ORDER_DATE;
    output.payerBankAccountNumber = input.PAYER_BANK_ACCOUNT_NUMBER;

    return output;
};
