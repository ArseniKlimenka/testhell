const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function riskPremiumFooterContent(input, ambientProperties) {

    const paymentFrequencyCode = getValue(input, 'context.Body.basicConditions.paymentFrequency.paymentFrequencyCode');
    const policyStartDate = getValue(input, 'context.Body.policyTerms.startDate');
    const risks = input.data?.risks ?? [];
    const amendmentType = input.context.Dimensions.amendmentType;
    const amendmentData = input.context.Body.amendmentData?.finChangeAmendmentData;
    const amendmentEffectiveDate = amendmentData?.mainAttributes?.amendmentEffectiveDate;

    let dateToFilterRisks = undefined;

    if (amendmentType === changeAmendmentTypes.financialChange) {

        dateToFilterRisks = amendmentEffectiveDate;
    }
    else {

        dateToFilterRisks = policyStartDate;
    }

    let riskPremiumSum;
    if (paymentFrequencyCode == '1') {
        riskPremiumSum = risks
            .reduce((acc, v) => { acc += v.riskPremium; return acc; }, 0);
    }
    else {
        riskPremiumSum = risks
            .filter(r => dateToFilterRisks && r.startDate == dateToFilterRisks)
            .reduce((acc, v) => { acc += v.riskPremium; return acc; }, 0);
    }

    return {
        riskPremiumSum: riskPremiumSum
    };
};
