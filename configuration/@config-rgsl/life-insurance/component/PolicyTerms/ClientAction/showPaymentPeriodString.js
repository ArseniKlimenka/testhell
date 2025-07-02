'use strict';

const { isAllowedPaymentPeriodString } = require('@config-rgsl/life-insurance/lib/policyTermsHelper');

module.exports = function showPaymentPeriodString(input, ambientProperties) {

    return isAllowedPaymentPeriodString(input, ambientProperties);

};
