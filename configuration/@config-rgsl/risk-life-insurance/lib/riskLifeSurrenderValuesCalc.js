const { round } = require('@config-system/infrastructure/lib/RoundingUtils');


module.exports = {

    /**
     * @description General function for the surrender values calculation
     */
    surrenderValuesCalculation: function (input, surrenderCoefficients, paidUpCoefficients) {
        const mainRiskCalcData = input.risks.find(r => r.code == input.mainRisk);
        const mainRiskSumInsured = mainRiskCalcData && mainRiskCalcData.sumInsured;

        if (!surrenderCoefficients) {
            return {
                table: []
            };
        }

        const surrenderValues = Object.values(surrenderCoefficients).map((sv, idx) => {
            const year = idx + 1;
            const paidUpValue = paidUpCoefficients && round(paidUpCoefficients[year] * mainRiskSumInsured, 2) || round(sv * mainRiskSumInsured, 2);
            return {
                year,
                surrenderValue: round(sv * mainRiskSumInsured, 2),
                paidUpValue,
                surrenderRate: round(sv, 12),
                paidUpRate: 0
            };
        });

        return {
            table: surrenderValues
        };
    },

    /**
     * @description General function for the surrender values calculation by premium
     */
    surrenderValuesCalculationByPremium: function (input, surrenderCoefficients, paidUpCoefficients) {

        const paymentPlan = input.attributes.paymentPlan || [];
        const wholePremium = round(paymentPlan.reduce((p, c) => p + c.paymentSum, 0), 2);

        const surrenderValues = Object.values(surrenderCoefficients).map((sv, idx) => {
            const year = idx + 1;
            const paidUpValue = paidUpCoefficients && round(paidUpCoefficients[year] * wholePremium, 2) || round(sv * wholePremium, 2);
            return {
                year,
                surrenderValue: round(sv * wholePremium, 2),
                paidUpValue,
                surrenderRate: round(sv, 12),
                paidUpRate: 0
            };
        });

        return {
            table: surrenderValues
        };
    },

    /**
    * @description General function for the surrender values calculation by installments
    */
    surrenderValuesCalculationByInstalments: function (input, surrenderCoefficients, paidUpCoefficients) {

        const installmentAmount = input.attributes.insuredSumAmount;

        const surrenderValues = Object.values(surrenderCoefficients).map((sv, idx) => {
            const year = idx + 1;
            const yearInstallmentAmount = installmentAmount * year;
            const paidUpValue = paidUpCoefficients && round(paidUpCoefficients[year] * yearInstallmentAmount, 2) || round(sv * yearInstallmentAmount, 2);
            return {
                year,
                surrenderValue: round(sv * yearInstallmentAmount, 2),
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
