'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.guaranteedIncomeName = input.NAME;
    output.guaranteedIncomeCode = input.CODE;
    output.guaranteedIncomeDescription = input.DESCRIPTION;

    return output;
};
