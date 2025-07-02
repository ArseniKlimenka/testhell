'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

/**
 * Calculates surrender, paid-up and annuity values table for a life block.
 */
module.exports = function surrender(input) {

    const { paymentFrequency, term, phAgeOnStartDate, phAgeOnEndDate, paymentPlan, contractIssueDate } = input.attributes;
    const { contractStartDate } = input;

    const fullDuration = phAgeOnEndDate - phAgeOnStartDate;
    const payDuration = parseInt(term || 0);

    const surrenderValues = [];
    let paidSum = 0;

    let I46204riskPremium = 0;
    if (DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(contractIssueDate), DateTimeUtils.formatDate(lifeInsuranceConstants.newRules.WCENOAS.startDate))) {
        I46204riskPremium = input.attributes.risks.filter(item => item.risk.riskCode == 'I46204')[0]?.riskPremium ?? 0;
    }

    for (let i = 0; i < fullDuration; i++) {

        const calcDate = DateTimeUtils.addYears(contractStartDate, i);
        paidSum = paidSum + paymentPlan
            .filter(item => item.paymentPeriodStart <= calcDate && item.paymentPeriodEnd >= calcDate)
            .reduce((acc, v) => acc += v.paymentSum - I46204riskPremium, 0);

        let surrenderValue = 0;
        let surrenderRate = 0;
        if (paymentFrequency == '1') {
            surrenderValue = round(paidSum / 2, 2);
            surrenderRate = 0.5;
        }
        else {
            let coeff = 1;
            if (paymentFrequency == '3') { coeff = 2; }
            if (paymentFrequency == '4') { coeff = 4; }
            if (paymentFrequency == '5') { coeff = 12; }
            surrenderValue = (i < payDuration) ? 0 : round(paidSum * coeff / 2, 2);
            surrenderRate = (i < payDuration) ? 0 : 0.5;
        }

        surrenderValues.push({
            year: i + 1,
            surrenderValue,
            paidUpValue: 0,
            surrenderRate,
            paidUpRate: 0
        });

    }

    return {
        table: surrenderValues
    };

};
