const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function shouldShowRiskProductRelatedFileds(input) {

    const amendmentType = input.rootContext.Dimensions.amendmentType;
    const stateCode = input.rootContext?.State?.Code;
    const isDraftFinChange = amendmentType === changeAmendmentTypes.financialChange && (stateCode === 'Draft' || stateCode === 'OperationsApproval');
    const currentItem = input.context;

    const originalPolicyRisks = input.rootContext.Body.amendmentData?.finChangeAmendmentData?.technicalData?.originalPolicyRisks ?? [];
    const isInitialPolicyRisk = originalPolicyRisks.some(r => r.risk.riskCode === currentItem?.risk?.riskCode);

    return currentItem?.risk?.riskCode && isDraftFinChange && currentItem?.risk?.withoutProduct && !isInitialPolicyRisk;
};
