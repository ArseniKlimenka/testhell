'use strict';

const termUtils = require('@config-rgsl/life-insurance/lib/termUtils');
const paymentPlanUtils = require('@config-rgsl/life-insurance/lib/paymentPlanUtils');
const outpaymentPlanUtils = require('@config-rgsl/life-insurance/lib/outpaymentPlanUtils');
const { productGroup, didType } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { isNoteProduct } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function applyData(input) {

    const functionInput = {
        context: {
            ConfigurationCodeName: this.businessContext.configurationCodeName,
            Body: this.businessContext.rootData
        }
    };

    termUtils.generateTerms(functionInput);

    const isPolicyCreating = this.businessContext?.relationName == 'CreatePolicy';
    const productCode = this.businessContext?.rootData?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const dimensions = this.businessContext?.configurationDimensions;

    if (isPolicyCreating && isNoteProduct(productCode)) {

        paymentPlanUtils.fillPaymentPlan(functionInput.context.Body, dimensions);
    }

    const bodyProductGroup = functionInput.context.Body.mainInsuranceConditions?.insuranceProduct?.productGroup;

    const issueDate = functionInput.context.Body.basicConditions?.issueDate;
    const productConf = functionInput.context.Body?.productConfiguration;

    if (productGroup.ISZ.descriptionRU == bodyProductGroup && productConf?.didType == didType.calculationMonthly) {

        const policyTerms = functionInput.context.Body.policyTerms;
        const effectiveDate = policyTerms?.effectiveDate;
        const endDate = policyTerms?.endDate;

        functionInput.context.Body.outpaymentPlan = outpaymentPlanUtils.getOutpaymentPlan(effectiveDate, endDate, productCode);
    }
};
