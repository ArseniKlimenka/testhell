'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.contractNumber = input.CONTRACT_NO;
    output.unpaidPeriodDate = input.UNPAID_PERIOD_DATE;

    return output;
};
