'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.investmentEndDate = input.AIP_INVESTMENT_END_DATE;

    return output;
};
