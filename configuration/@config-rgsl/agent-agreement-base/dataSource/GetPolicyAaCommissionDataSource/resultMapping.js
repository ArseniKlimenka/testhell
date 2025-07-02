'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function resultMapping(input) {

    return {
        contractNumber: input.CONTRACT_NUMBER,
        policyStartDate: dateUtils.formatDate(input.POLICY_START_DATE),
        dueDate: dateUtils.formatDate(input.DUE_DATE),
        ppInsuranceYear: input.PP_INSURANCE_YEAR,
        ruleNum: input.RULE_NUM,
        startDate: dateUtils.formatDate(input.START_DATE),
        endDate: dateUtils.formatDate(input.END_DATE),
        registratorNumber: input.REGISTRATOR_NUMBER,
        minRate: input.MIN_RATE,
        maxRate: input.MAX_RATE,
        maxRateLimit: input.MAX_RATE_LIMIT,
        rate: input.RATE,
        expensesRate: input.EXPENSES_RATE ?? 0,
        naturalPersonRate: input.NATURAL_PERSON_RATE ?? 0,
        solePropriatorRate: input.SOLE_PROPRIATOR_RATE ?? 0,
        amount: input.AMOUNT,
        disableDiscount: input.DISABLE_DISCOUNT,
        disableManualCorrection: input.DISABLE_MANUAL_CORRECTION,
        alwaysUseMaxRate: input.ALWAYS_USE_MAX_RATE,
        manualRule: input.MANUAL_RULE
    };
};
