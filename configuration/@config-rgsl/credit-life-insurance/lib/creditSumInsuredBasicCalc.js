const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const creditCalcHelper = require('@config-rgsl/life-insurance/lib/creditCalcHelper');

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
        coeff
    }) {

        let sumInsured = 0;
        let sumInsuredByPeriod = [];
        let calcByPeriodResult = {};

        if (input.productCode == 'CACB')
        { calcByPeriodResult = this.sumInsuredCalculationByPeriodCACB({
            riskData,
            input,
            risk
        }); }
        else
        { calcByPeriodResult = this.sumInsuredCalculationByPeriod({
            riskData,
            input,
            risk,
            coeff
        }); }

        sumInsured = calcByPeriodResult.sumInsured;
        sumInsuredByPeriod = calcByPeriodResult.sumInsuredByPeriod;

        return {
            sumInsured,
            sumInsuredByPeriod
        };

    },

    sumInsuredCalculationByPeriod: function ({
        riskData,
        input,
        risk,
        coeff
    }) {
        let sumInsured = 0;
        let sumInsuredByPeriod = [];

        const { startDate, endDate } = risk;
        const { annuityPaymentSum, creditRate, creditSum } = input;
        const periodMonths = 1;
        const durationInMonths = dateUtils.getMonthDifference(startDate, dateUtils.addDays(endDate, 1));
        const sumInsuredCoeff = coeff || 1;

        const periods = dateUtils.getPeriodsTableByMonths(startDate, dateUtils.addDays(endDate, 1), periodMonths);
        sumInsuredByPeriod = periods && periods.length > 0
            && periods.map(p => {
                let insuredSum = round(annuityPaymentSum * (1 - Math.pow((1 + creditRate / 12), (-(durationInMonths - p.periodNumber + 1)))) / (creditRate / 12) * (1 + creditRate / 12) * sumInsuredCoeff, 0);
                if (insuredSum < 0) { insuredSum = 0; }
                return {
                    periodNumber: p.periodNumber,
                    insuredSum: insuredSum,
                    periodStartDate: p.periodStartDate,
                    periodEndDate: p.periodEndDate
                };
            });

        if (sumInsuredByPeriod.length > 0) {
            sumInsuredByPeriod[0].insuredSum = round(creditSum * sumInsuredCoeff, 0);
        }
        sumInsured = round(creditSum * sumInsuredCoeff, 0);

        return {
            sumInsured,
            sumInsuredByPeriod
        };
    },

    sumInsuredCalculationByPeriodCACB: function ({
        riskData,
        input,
        risk
    }) {
        let sumInsured = 0;
        let sumInsuredByPeriod = [];

        const { startDate, endDate } = risk;
        const { creditRate, creditSum, productCode } = input;
        const periodMonths = 1;
        const durationInMonths = dateUtils.getMonthDifference(startDate, dateUtils.addDays(endDate, 1));
        const periods = dateUtils.getPeriodsTableByMonths(startDate, endDate, periodMonths);
        const annuityPaymentSum = creditCalcHelper.getAnnuityPaymentSumCACB(creditSum, creditRate, durationInMonths);

        let percents;
        let od;
        let rest = creditSum;
        sumInsuredByPeriod = periods && periods.length > 0
            && periods.map(p => {

                let insuredSum;
                if ([1, 2].includes(p.periodNumber))
                { insuredSum = creditSum; }
                else if ([3].includes(p.periodNumber))
                { insuredSum = creditSum - ((creditSum * creditRate / 12 / ((1 - Math.pow((1 + creditRate / 12), (0 - durationInMonths)))) - creditSum * creditRate / 12)); }
                else {
                    percents = round(rest * creditRate / 12, 10);
                    od = round(annuityPaymentSum - percents, 10);
                    rest = round(rest - od, 10);
                    insuredSum = rest - ((creditSum * creditRate / 12 / ((1 - Math.pow((1 + creditRate / 12), (0 - durationInMonths)))) - rest * creditRate / 12));
                }
                if (insuredSum < 0) { insuredSum = 0; }

                return {
                    periodNumber: p.periodNumber,
                    insuredSum: round(insuredSum * 1.025, 2),
                    periodStartDate: p.periodStartDate,
                    periodEndDate: p.periodEndDate
                };

            });
        sumInsured = sumInsuredByPeriod[0].insuredSum;

        return {
            sumInsured,
            sumInsuredByPeriod
        };
    }

};
