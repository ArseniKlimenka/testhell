'use strict';

const { nullCheck, convertToBoolean } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function resultMapping(input) {

    const output = {};

    output.registrator = nullCheck(input.REGISTRATOR_NUMBER);
    output.validity = {};
    output.validity.start = nullCheck(input.START_DATE);
    output.validity.end = nullCheck(input.END_DATE);
    output.ruleNum = nullCheck(input.RULE_NUM);
    output.minRate = nullCheck(input.MIN_RATE);
    output.maxRate = nullCheck(input.MAX_RATE);
    output.maxRateLimit = nullCheck(input.MAX_RATE_LIMIT);
    output.rate = nullCheck(input.RATE);
    output.expensesRate = nullCheck(input.EXPENSES_RATE);
    output.natuaralPersonRate = nullCheck(input.NATURAL_PERSON_RATE);
    output.solePropriatorRate = nullCheck(input.SOLE_PROPRIATOR_RATE);
    output.amount = nullCheck(input.AMOUNT);
    output.disableDiscount = convertToBoolean(input.DISABLE_DISCOUNT);
    output.disableManualCorrection = convertToBoolean(input.DISABLE_MANUAL_CORRECTION);
    output.alwaysUseMaxRate = convertToBoolean(input.ALWAYS_USE_MAX_RATE);
    output.insuranceYearFrom = nullCheck(input.INSURANCE_YEAR_FROM) || 0;
    output.insuranceYearTo = nullCheck(input.INSURANCE_YEAR_TO) || 0;
    output.manualRule = nullCheck(input.MANUAL_RULE);

    return output;

};
