'use strict';

const outpaymentPlanUtils = require('@config-rgsl/life-insurance/lib/outpaymentPlanUtils');
const { productGroup, didType } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function applyData(input) {

    const body = this.businessContext?.rootData;
    const bodyProductGroup = body?.mainInsuranceConditions?.insuranceProduct?.productGroup;

    if (productGroup.ISZ.descriptionRU != bodyProductGroup) {
        return;
    }

    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body.basicConditions?.issueDate;
    const productConf = body?.productConfiguration ?? {};

    if (productConf?.didType != didType.calculationMonthly) {
        return;
    }

    const policyTerms = body.policyTerms;
    const effectiveDate = policyTerms.effectiveDate;
    const endDate = policyTerms.endDate;

    body.outpaymentPlan = outpaymentPlanUtils.getOutpaymentPlan(effectiveDate, endDate, productCode) ?? undefined;
};
