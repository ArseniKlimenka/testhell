const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const lifeConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

/**
 * We have two levels of calculation insured sum
 *
 * The first level where we have riskCode as a function name is on risk level. Mostly,
 * it will be the same, but we need it for the ability to put a specified conditions or parameters
 * on the risk level.
 *
 * The second level is the generalSumInsuredCalc() function. It will be called in every
 * 1st level functions because the calculation approach of the sum insured  is the same.
 *
 */

module.exports = {

    /**
    * @description general sum insured calculation
    */
    generalSumInsuredCalc: function ({
        riskData,
        input,
        risk,
        shouldCalculatedByPeriod,
        isDisabilityRisk,
        minValueinRub,
    }) {
        let sumInsured = 0;
        let sumInsuredByPeriod = [];
        let calcByPeriodResult = {};

        const { installmentAmount, paymentFrequency, term } = input;

        switch (paymentFrequency) {
            case lifeConstants.paymentFrequency.oneTime.code:
                sumInsured = installmentAmount;
                break;

            case lifeConstants.paymentFrequency.annual.code:

                calcByPeriodResult = this.sumInsuredCalculationByPeriod(
                    riskData,
                    installmentAmount,
                    term,
                    risk,
                    shouldCalculatedByPeriod,
                    isDisabilityRisk,
                    false // isSemiAnnual?
                );

                sumInsured = calcByPeriodResult.sumInsured;
                sumInsuredByPeriod = calcByPeriodResult.sumInsuredByPeriod;
                break;

            case lifeConstants.paymentFrequency.semiAnnual.code:
                calcByPeriodResult = this.sumInsuredCalculationByPeriod(
                    riskData,
                    installmentAmount,
                    term,
                    risk,
                    shouldCalculatedByPeriod,
                    isDisabilityRisk,
                    true // isSemiAnnual?
                );

                sumInsured = calcByPeriodResult.sumInsured;
                sumInsuredByPeriod = calcByPeriodResult.sumInsuredByPeriod;
                break;
        }

        if (minValueinRub) {
            sumInsured = Math.min(sumInsured, minValueinRub);
            sumInsuredByPeriod.forEach(item => item.insuredSum = Math.min(item.insuredSum, minValueinRub));
        }

        return {
            sumInsured,
            sumInsuredByPeriod
        };

    },

    sumInsuredCalculationByPeriod: function (
        riskData,
        installmentAmount,
        term,
        risk,
        shouldCalculatedByPeriod,
        isDisabilityRisk,
        isSemiAnnual
    ) {
        let sumInsured = 0;
        let sumInsuredByPeriod = [];
        const termToNumber = term && parseInt(term) || 1;
        const annualCoef = isSemiAnnual ? 2 : 1;

        if (!shouldCalculatedByPeriod) {
            sumInsured = installmentAmount * termToNumber * annualCoef;
        } else {
            const { startDate, endDate } = risk;
            const periodMonths = isSemiAnnual ? 6 : 12;
            const periods = shouldCalculatedByPeriod && dateUtils.getPeriodsTableByMonths(startDate, endDate, periodMonths);
            sumInsuredByPeriod = shouldCalculatedByPeriod && periods && periods.length > 0
                && periods.map(p => {
                    const regularInstallment = isDisabilityRisk ?
                        riskData
                            .filter(p => ['E36102', 'DLPSS36102', 'DPVV36102', 'E36404', 'DLPSS36404', 'DLPVV36404'].includes(p.riskCode))
                            .reduce((acc, v) => { acc += v.premium; return acc; }, 0)
                        : installmentAmount;
                    const periodNumber = isDisabilityRisk ? termToNumber * annualCoef - p.periodNumber : p.periodNumber;
                    return {
                        periodNumber: p.periodNumber,
                        insuredSum: round((regularInstallment * periodNumber), 2) || 0,
                        periodStartDate: p.periodStartDate,
                        periodEndDate: p.periodEndDate
                    };
                });

            sumInsured = isDisabilityRisk && sumInsuredByPeriod.length > 0 ?
                sumInsuredByPeriod[0].insuredSum
                : sumInsuredByPeriod.slice(-1)[0].insuredSum;
        }

        return {
            sumInsured,
            sumInsuredByPeriod
        };
    }
};
