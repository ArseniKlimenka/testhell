module.exports = function VerificationActionToRunBefore(input, ambientProperties) {
    if (input.data.Body.configurationCodeName == "EquityLifeInsurancePolicy")
    { this.view.getControlByElementId('AttachmentsEquityPolicyInlineView').hideElement(); }
    if (input.data.Body.configurationCodeName == "InvestmentLifeInsurancePolicy")
    { this.view.getControlByElementId('AttachmentsInvPolicyInlineView').hideElement(); }
    if (input.data.Body.configurationCodeName == "AccumulatedLifeInsurancePolicy")
    { this.view.getControlByElementId('AttachmentsAccPolicyInlineView').hideElement(); }
    if (input.data.Body.configurationCodeName == "MedLifeInsurancePolicy")
    { this.view.getControlByElementId('AttachmentsMedPolicyInlineView').hideElement(); }
    if (input.data.Body.configurationCodeName == "RiskLifeInsurancePolicy")
    { this.view.getControlByElementId('AttachmentsRiskPolicyInlineView').hideElement(); }
    if (input.data.Body.configurationCodeName == "AccidentLifeInsurancePolicy")
    { this.view.getControlByElementId('AttachmentsAccidentPolicyInlineView').hideElement(); }
    if (input.data.Body.configurationCodeName == "CollectiveLifeInsurancePolicy")
    { this.view.getControlByElementId('AttachmentsCollectivePolicyInlineView').hideElement(); }
};
