const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function shouldShowRiskStartDateEditField(input, ambientProperties) {

    const stateCode = input.rootContext?.State?.Code;
    const amendmentType = input.rootContext.Dimensions.amendmentType;
    const isDraftFinChange = amendmentType === changeAmendmentTypes.financialChange && (stateCode === 'Draft' || stateCode === 'OperationsApproval');
    const originalPolicyRisks = input.rootContext.Body.amendmentData?.finChangeAmendmentData?.technicalData?.originalPolicyRisks ?? [];
    const isInitialPolicyRisk = originalPolicyRisks.some(r => r.risk.riskCode === input.rowContext.risk?.riskCode);

    return isDraftFinChange && !isInitialPolicyRisk;
};
