
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { paymentFrequency } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { skipForMigrated } = require('@config-rgsl/life-insurance/lib/migrationValidationHelper');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const paymentPlanUtils = require('@config-rgsl//life-insurance/lib/paymentPlanUtils');

module.exports = {
    generateSummary: function (input, Body, dimensions) {

        const contractType = getValue(input, 'amendment.attributes.contractType');
        const amendmentType = getValue(input, 'amendment.attributes.amendmentType');
        const skipMigrated = skipForMigrated(Body);

        if (contractType === 'Amendment' && amendmentType !== 'FinancialChange') {

            return;
        }


        Body.basicConditions.maxInsuredSum = undefined;

        const itemEvaluation = getValue(input, 'evaluation.itemEvaluation');

        if (itemEvaluation[0]) {

            const riskData = getValue(itemEvaluation[0], 'attributes.calculatedAttributes.riskData', []);
            const maxInsuredSums = riskData.filter(x => x.maxInsuredSum).map(x => x.maxInsuredSum);

            if (maxInsuredSums.length > 0) {

                Body.basicConditions.maxInsuredSum = Math.min.apply(null, maxInsuredSums);
            }
        }

        if (!skipMigrated) {

            Body.risks.forEach((r, idx) => {

                const currentRiskCalculatedData =
                    itemEvaluation[0]
                    && itemEvaluation[0].attributes
                    && itemEvaluation[0].attributes.calculatedAttributes
                    && itemEvaluation[0].attributes.calculatedAttributes.riskData
                    && itemEvaluation[0].attributes.calculatedAttributes.riskData.find(calculatedRiskData => calculatedRiskData.riskCode === r.risk?.riskCode &&
                        calculatedRiskData.startDate === r.startDate &&
                        calculatedRiskData.endDate === r.endDate) || {};

                r.riskPremium = currentRiskCalculatedData.premium || 0;
                r.riskInsuredSum = currentRiskCalculatedData.sumInsured || 0;
                r.riskInsuredSumWithoutCashBack = currentRiskCalculatedData.sumInsuredWithoutCashBack || r.riskInsuredSum;

                if (amendmentType !== 'FinancialChange') {

                    r.riskInsuredSumByPeriod = currentRiskCalculatedData.sumInsuredByPeriod ?? [];
                }

                return r;
            });
        }

        if (amendmentType !== 'FinancialChange') {

            const calculatedSurrenderValues = input
                && input.evaluation
                && input.evaluation.itemEvaluation
                && input.evaluation.itemEvaluation[0]
                && input.evaluation.itemEvaluation[0].life
                && input.evaluation.itemEvaluation[0].life.blocks
                && input.evaluation.itemEvaluation[0].life.blocks[0]
                && input.evaluation.itemEvaluation[0].life.blocks[0].surrenderValues;

            Body.surrenderValues = [];
            const startDate = input.startDate;
            const endDate = input.endDate;
            const contractPeriods = dateUtils.getPeriodsTableByMonths(startDate, endDate, 12);

            Body.surrenderValues = contractPeriods.map((p, idx) => {
                const surrenderValue = calculatedSurrenderValues[idx] && calculatedSurrenderValues[idx].surrenderValue || 0;
                const paidUpValue = calculatedSurrenderValues[idx] && calculatedSurrenderValues[idx].paidUpValue || 0;
                return {
                    periodStartDate: p.periodStartDate,
                    periodEndDate: p.periodEndDate,
                    surrenderValue,
                    periodSurrenderValue: paidUpValue
                };
            });
        }
        else {

            const amendmentEffectiveDate = Body.amendmentData?.finChangeAmendmentData?.mainAttributes?.amendmentEffectiveDate;
            const endDate = Body.policyTerms.endDate;

            if (!amendmentEffectiveDate) {

                Body.surrenderValues.length = 0;
                return;
            }

            const periods = dateUtils.getPeriodsTableByMonths(amendmentEffectiveDate, endDate, 12);
            const newSurrenderValues = periods.map(p => {

                const existingValue = Body.surrenderValues.find(v => v.periodStartDate === p.periodStartDate && v.periodEndDate === p.periodEndDate);

                return {
                    periodStartDate: p.periodStartDate,
                    periodEndDate: p.periodEndDate,
                    surrenderValue: existingValue?.surrenderValue ?? 0,
                    periodSurrenderValue: existingValue?.periodSurrenderValue ?? 0
                };
            });

            Body.surrenderValues.length = 0;
            newSurrenderValues.forEach(v => {

                Body.surrenderValues.push(v);
            });
        }

        // TODO: Temporary work-around. Core platform expects constant words in paymentFrequency (e.g. 'Yearly', 'Single', 'Halfyearly', ...)
        // Tariffs are currently implemented to use values '1', '2', '3', so we change paymentFrequency back to word in last step: generateSummary.
        input.evaluation.itemEvaluation[0].paymentFrequency = getCorePaymentFrequencyDescription(input.evaluation.itemEvaluation[0].paymentFrequency);

        paymentPlanUtils.fillPaymentPlan(Body, dimensions);

        return {
            technicalData: {
                paymentPlan: Body.paymentPlan ?? [],
                surrenderValues: Body.surrenderValues ?? [],
                risks: Body.risks
            }
        };
    }
};

function getCorePaymentFrequencyDescription(code) {
    let coreName;

    // in case of amendments we have already converted description
    if (["Single", "Yearly", "Halfyearly", "Quarterly", "Monthly"].includes(code)) { return code; }

    switch (code) {
        case paymentFrequency.oneTime.code:
            coreName = "Single";
            break;
        case paymentFrequency.annual.code:
            coreName = "Yearly";
            break;
        case paymentFrequency.semiAnnual.code:
            coreName = "Halfyearly";
            break;
        case paymentFrequency.quarterly.code:
            coreName = "Quarterly";
            break;
        case paymentFrequency.monthly.code:
            coreName = "Monthly";
            break;
        default:
            throw 'Invalid frequency: ' + code + '.';
    }

    return coreName;
}


