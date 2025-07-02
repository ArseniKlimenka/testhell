const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function shouldShowRiskEndDateEditField(input, ambientProperties) {

    const stateCode = input.rootContext?.State?.Code;
    const amendmentType = input.rootContext.Dimensions.amendmentType;
    const isDraftFinChange = amendmentType === changeAmendmentTypes.financialChange && (stateCode === 'Draft' || stateCode === 'OperationsApproval');

    const originalPolicyRisks = input.rootContext.Body.amendmentData?.finChangeAmendmentData?.technicalData?.originalPolicyRisks ?? [];
    const originalPolicyTerms = input.rootContext.Body.amendmentData?.finChangeAmendmentData?.technicalData?.originalPolicyTerms;
    const initialPolicyRisk = originalPolicyRisks.find(r => r.risk.riskCode === input.rowContext.risk?.riskCode);
    const isEndDateEditableForRisk = !initialPolicyRisk || (initialPolicyRisk?.endDate !== originalPolicyTerms?.endDate);

    return isDraftFinChange && isEndDateEditableForRisk;
};
