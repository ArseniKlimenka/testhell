'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.dueDate = input.DUE_DATE;
    output.docAmount = input.DOC_AMOUNT;
    output.currencyCode = input.CURRENCY_CODE;
    output.bankStatementItemId = input.BANK_STATEMENT_ITEM_ID;
    output.transactionDate = input.TRANSACTION_DATE;
    output.amount = input.AMOUNT;
    output.amountLife = input.AMOUNT_LIFE;
    output.amountLifeRub = input.AMOUNT_LIFE_RUB;
    output.debtorName = input.DEBTOR_NAME;

    return output;
};
