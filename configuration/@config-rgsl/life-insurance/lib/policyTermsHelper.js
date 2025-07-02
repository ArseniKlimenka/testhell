'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

function isAllowedPaymentPeriodString(input, ambientProperties) {

    if (ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy') {

        return true;
    }

    return false;
}

function setPaymentPeriodString(input, ambientProperties) {

    const body = input.context?.Body;
    const policyTerms = body?.policyTerms;
    const startDate = policyTerms?.startDate;
    const endDate = policyTerms?.endDate;

    if (isAllowedPaymentPeriodString(input, ambientProperties) && startDate && endDate) {

        const dateDifferenceRuString = DateTimeUtils.getDateDifferenceRuString(startDate, endDate);
        body.policyTerms.paymentPeriodString = dateDifferenceRuString;
    }
}

module.exports = {
    isAllowedPaymentPeriodString,
    setPaymentPeriodString
};
