'use strict';

module.exports = function resultMapping(input) {

    return {
        insuredFullName: input.INSURED_FULL_NAME,
        riskName: input.RISK_NAME,
        insuranceYear: input.INSURANCE_YEAR,
        dueDate: input.DUE_DATE,
        commRate: input.COMM_RATE,
    };
};
