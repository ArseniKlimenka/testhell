const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = {

    /**
     * @description General function for the surrender values calculation
     */
    surrenderValuesCalculation: function (input, surrenderCoefficients, paidUpCoefficients, isCalcFromInstallmentAmount = false) {
        const mainRiskCalcData = input.risks.find(r => r.code == input.mainRisk);
        const mainRiskSumInsured = mainRiskCalcData && mainRiskCalcData.sumInsured;
        const installmentAmount = input?.attributes?.installmentAmount ?? 0;
        const isIBA = productGroupArray.BASIS_ACTIVE_20.includes(input?.attributes?.productCode);
        const baseSum = (isCalcFromInstallmentAmount || isIBA) ? installmentAmount : mainRiskSumInsured;

        const surrenderValues = Object.values(surrenderCoefficients).map((sv, idx) => {
            const year = idx + 1;
            const paidUpValue = paidUpCoefficients && round(paidUpCoefficients[year] * baseSum, 2) || round(sv * baseSum, 2);
            return {
                year,
                surrenderValue: round(sv * baseSum, 2),
                paidUpValue,
                surrenderRate: round(sv, 12),
                paidUpRate: 0
            };
        });

        return {
            table: surrenderValues
        };
    }
};
