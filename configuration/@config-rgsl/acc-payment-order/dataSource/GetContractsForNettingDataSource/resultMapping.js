'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.contractNumber = input.CONTRACT_NUMBER;
    output.amount = input.AMOUNT;
    output.openAmount = input.OPEN_AMOUNT;
    output.currency = input.CURRENCY_CODE;

    return output;
};
