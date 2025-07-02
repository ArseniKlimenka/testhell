'use strict';

const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping({ input, sinkExchange }) {

    const contractType = input.contractType;
    const amendmentType = input.amendmentType;
    const body = input.body;
    const commonBody = input.commonBody;
    const snapshotBody = input.snapshotBody;
    const summary = input.summary;

    if (amendmentType === changeAmendmentTypes.financialChange) {

        body.paymentPlan = summary?.technicalData?.paymentPlan ?? [];

        if (snapshotBody) {

            const amendmentData = snapshotBody.amendmentData?.finChangeAmendmentData;
            const effectiveDate = amendmentData?.mainAttributes?.amendmentEffectiveDate;
            const originalPaymentPlan = amendmentData?.technicalData?.originalPaymentPlanPart ?? [];
            const calculatedPaymentPlanPart = body.paymentPlan.filter(i => i.paymentPeriodStart >= effectiveDate);
            let paymentPlanResult = deepCopy(originalPaymentPlan);
            paymentPlanResult = paymentPlanResult.concat(calculatedPaymentPlanPart);
            snapshotBody.paymentPlan = paymentPlanResult;
        }

        body.surrenderValues = summary?.technicalData?.surrenderValues ?? [];

        const combinedRisks = summary?.technicalData?.risks ?? [];
        const amendmentRisks = body.risks ?? [];

        amendmentRisks.forEach(r => {

            const risk = combinedRisks.find(cr => cr.risk.riskCode === r.risk.riskCode && cr.startDate === r.startDate && cr.endDate === r.endDate);

            r.riskPremium = risk?.riskPremium ?? 0;
            r.riskInsuredSum = risk?.riskInsuredSum ?? 0;
            r.riskInsuredSumByPeriod = risk?.riskInsuredSumByPeriod ?? [];
        });
    }

    return {
        body,
        commonBody,
        snapshotBody,
        summary
    };
};
