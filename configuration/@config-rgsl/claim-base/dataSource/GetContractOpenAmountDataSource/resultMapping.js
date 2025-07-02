'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.contractNumber = input.CONTRACT_NUMBER;
    output.dueDate = input.DUE_DATE;
    output.amount = input.AMOUNT;
    output.openAmount = input.OPEN_AMOUNT;
    output.periodNumber = input.PERIOD_NUMBER;

    return output;
};
