const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = {

    /**
    * @description general sum insured calculation
    */
    generalSumInsuredCalc: function ({
        input,
        risk,
        shouldCalculatedByPeriod,
        isDriverFixed,
        minValueinRub,
        coeff,
        periodCoeff,
        isAnnualGuaranteedIncome
    }) {
        let sumInsured = 0;
        let sumInsuredByPeriod = [];
        let calcByPeriodResult = {};
        const riskCode = risk.risk?.riskCode;
        const IBAVTB = lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_20.includes(input.productCode) && riskCode == 'E36904';

        const { installmentAmount, term, productCode, contractIssueDate } = input;
        const isAfter20250101 = dateTimeUtils.isAfterOrEqual(dateTimeUtils.formatDate(contractIssueDate), dateTimeUtils.formatDate('2025-01-01'));

        calcByPeriodResult = this.sumInsuredCalculationByPeriod(
            installmentAmount,
            term,
            risk,
            shouldCalculatedByPeriod,
            isDriverFixed,
            periodCoeff,
            isAnnualGuaranteedIncome,
            productCode,
            input
        );

        sumInsured = calcByPeriodResult.sumInsured;
        sumInsuredByPeriod = calcByPeriodResult.sumInsuredByPeriod;

        if (coeff && !isAnnualGuaranteedIncome && !IBAVTB) {
            sumInsured *= coeff;
            sumInsuredByPeriod.forEach(item => item.insuredSum *= coeff);
        } else if (IBAVTB) {
            sumInsured += coeff;
            sumInsuredByPeriod.forEach(item => item.insuredSum += coeff);
        }

        if (minValueinRub) {
            if (lifeInsuranceConstants.productGroupArray.THIRTY_PERCENT_OF_DNS.includes(productCode) && ['DNS36404', 'DNS36904'].includes(riskCode)
            || lifeInsuranceConstants.productGroupArray.THIRTY_PERCENT_OF_DNS_IDGV_OAS.includes(productCode) && ['DNS36404'].includes(riskCode) && isAfter20250101) {
                sumInsured *= 0.3;
                sumInsured = Math.min(sumInsured, minValueinRub);
                sumInsuredByPeriod.forEach(item => item.insuredSum = Math.min(item.insuredSum, minValueinRub));
            } else {
                sumInsured = Math.min(sumInsured, minValueinRub);
                sumInsuredByPeriod.forEach(item => item.insuredSum = Math.min(item.insuredSum, minValueinRub));
            }
        }

        return {
            sumInsured,
            sumInsuredByPeriod
        };

    },

    sumInsuredCalculationByPeriod: function (
        installmentAmount,
        term,
        risk,
        shouldCalculatedByPeriod,
        isDriverFixed,
        periodCoeff,
        isAnnualGuaranteedIncome,
        productCode,
        input
    ) {
        let sumInsured = 0;
        let sumInsuredByPeriod = [];
        const termToNumber = term && parseInt(term) || 1;

        if (!shouldCalculatedByPeriod) {
            sumInsured = installmentAmount;
        }
        else if ([product.NOTE1BFKO4, product.NOTEV3BFKO, product.NOTEV1BFKO].includes(productCode)) {
            if ((risk.risk ? risk.risk.riskCode : risk.riskCode) == 'DLP36904') {
                const { startDate, endDate } = risk;
                sumInsuredByPeriod = [
                    {
                        periodNumber: 1,
                        insuredSum: round(installmentAmount, 2),
                        periodStartDate: startDate,
                        periodEndDate: dateUtils.substractDays(dateUtils.addMonths(startDate, 3), 1)
                    },
                    {
                        periodNumber: 2,
                        insuredSum: round(installmentAmount * periodCoeff / 1000, 2),
                        periodStartDate: dateUtils.addMonths(startDate, 3),
                        periodEndDate: endDate
                    }
                ];
                sumInsured = sumInsuredByPeriod && sumInsuredByPeriod[0] ? sumInsuredByPeriod[0].insuredSum : 0;
            }
        }
        else {
            const { startDate, endDate } = risk;

            const periods = shouldCalculatedByPeriod && dateUtils.getPeriodsTable(startDate, endDate);
            sumInsuredByPeriod = shouldCalculatedByPeriod && periods && periods.length > 0
                && periods.map((p, idx) => {

                    const coupon = (input.fixRate / 100) * installmentAmount;
                    let insuredSum;
                    if (isDriverFixed)
                    { insuredSum = installmentAmount * (1 + 0.02 * p.year); }
                    else if (periodCoeff) {
                        if (isAnnualGuaranteedIncome) {
                            insuredSum = installmentAmount * periodCoeff / 100;
                        } else {
                            insuredSum = installmentAmount * (1 + periodCoeff * idx / 100) || 0;
                        }
                    }
                    else if (lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_20.includes(productCode) && idx != 0) {
                        insuredSum = installmentAmount + (coupon * idx);
                    }
                    else
                    { insuredSum = installmentAmount * p.year || 0; }

                    return {
                        periodNumber: p.year,
                        insuredSum: round(insuredSum, 2),
                        periodStartDate: p.periodStartDate,
                        periodEndDate: p.periodEndDate
                    };
                });

            sumInsured = isDriverFixed && sumInsuredByPeriod.length > 0 ?
                sumInsuredByPeriod.slice(-1)[0].insuredSum
                // : sumInsuredByPeriod[0].insuredSum;
                : sumInsuredByPeriod.slice(-1)[0].insuredSum;
        }

        return {
            sumInsured,
            sumInsuredByPeriod
        };
    }
};
