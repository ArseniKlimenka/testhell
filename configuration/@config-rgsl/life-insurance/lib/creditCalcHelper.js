const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const creditRisks = require('@config-rgsl/life-insurance/lib/creditRisks');

module.exports = {

    getAnnuityPaymentSumCACB: function (creditSum, creditRate, insuranceTermsMonths) {
        return creditSum * creditRate / 12 / ((1 - Math.pow((1 + creditRate / 12), (0 - insuranceTermsMonths))));
    },

    getRiskPremiumCACB: function (body) {

        const productCode = getValue(body, 'mainInsuranceConditions.insuranceProduct.productCode');
        const issueDate = getValue(body, 'basicConditions.issueDate');
        const creditProgramId = getValue(body, 'creditProgram.creditProgramId');
        const creditSumNet = getValue(body, 'creditContract.creditSumNet');
        const insuranceTermsMonths = getValue(body, 'basicConditions.insuranceTermsMonths');

        if (!productCode || !issueDate || !creditProgramId || !creditSumNet || !insuranceTermsMonths) {
            return;
        }

        const risksTariffs = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate });
        let tariffRate = 0;
        Object
            .keys(risksTariffs)
            .filter(item => item.indexOf('COEFF') == -1)
            .forEach(item => {
                const itemTariff = getValue(risksTariffs, item, 0);
                tariffRate += itemTariff;
            });

        const riskPremium = round(creditSumNet * 1.1 * tariffRate * insuranceTermsMonths / (1 - 1.1 * tariffRate * insuranceTermsMonths), 0);

        return riskPremium;

    }

};
