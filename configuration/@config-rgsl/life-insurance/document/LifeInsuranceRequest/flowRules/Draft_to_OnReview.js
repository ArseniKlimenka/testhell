'use strict';

const { checkInvestmentPeriod } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestFlowRulesHelper');

/**
 * @errorCode {errorCode} InvestmentPeriodShouldBeMoreThan90Days
 */

module.exports = function rule(input) {

    const validationErrors = [];

    checkInvestmentPeriod(input, validationErrors);

    return validationErrors;

};
