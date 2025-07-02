const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const creditCalcHelper = require('@config-rgsl/life-insurance/lib/creditCalcHelper');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function applyData(input) {

    const contractType = this.businessContext.configurationDimensions.contractType;
    const body = this.businessContext.rootData;
    const creditSumNet = getValue(body, 'creditContract.creditSumNet');

    if (contractType == lifeInsuranceConstants.contractType.Quote) {
        // set creditSum
        const riskPremium = creditCalcHelper.getRiskPremiumCACB(body);
        if (riskPremium)
        { body.creditContract.creditSum = creditSumNet + riskPremium; }
        else
        { body.creditContract.creditSum = undefined; }

        // set annuityPaymentSum
        const creditSum = getValue(body, 'creditContract.creditSum');
        const creditRate = getValue(body, 'creditContract.creditRate');
        const insuranceTermsMonths = getValue(body, 'basicConditions.insuranceTermsMonths');
        if (creditSum && creditRate && insuranceTermsMonths)
        { body.creditContract.annuityPaymentSum = round(creditCalcHelper.getAnnuityPaymentSumCACB(creditSum, creditRate, insuranceTermsMonths), 2); }
        else
        { body.creditContract.annuityPaymentSum = undefined; }
    }

};
