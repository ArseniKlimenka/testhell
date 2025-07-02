const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = async function VerificationOnLoad(input, ambientProperties) {

    // params
    const configurationCodeName = input.context.Body.configurationCodeName;
    const stateCode = input.context.State.Code;
    const isSaveAvailable = isSaveOperationAvailable(this.view);
    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isOperationsUser = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'OperationsGroup');

    // show/hide elements
    if (configurationCodeName == "EquityLifeInsurancePolicy")
    { this.view.getControlByElementId('AttachmentsEquityPolicyInlineView').showElement(); }
    if (configurationCodeName == "InvestmentLifeInsurancePolicy")
    { this.view.getControlByElementId('AttachmentsInvPolicyInlineView').showElement(); }
    if (configurationCodeName == "AccumulatedLifeInsurancePolicy")
    { this.view.getControlByElementId('AttachmentsAccPolicyInlineView').showElement(); }
    if (configurationCodeName == "MedLifeInsurancePolicy")
    { this.view.getControlByElementId('AttachmentsMedPolicyInlineView').showElement(); }
    if (configurationCodeName == "RiskLifeInsurancePolicy")
    { this.view.getControlByElementId('AttachmentsRiskPolicyInlineView').showElement(); }
    if (configurationCodeName == "AccidentLifeInsurancePolicy")
    { this.view.getControlByElementId('AttachmentsAccidentPolicyInlineView').showElement(); }
    if (configurationCodeName == "CollectiveLifeInsurancePolicy")
    { this.view.getControlByElementId('AttachmentsCollectivePolicyInlineView').showElement(); }

    if (stateCode == "Cancelled") {
        this.view.getControlByElementId('CancelledToDraft').showElement();
        this.view.getControlByElementId('DraftToCancelled').hideElement();
        this.view.getControlByElementId('DraftToIssued').hideElement();
        this.view.getControlByElementId('IssuedToDraft').hideElement();
        if (isOperationsUser)
        { this.view.getControlByElementId('CancelledToDraftOperations').showElement(); }
        else
        { this.view.getControlByElementId('CancelledToDraftOperations').hideElement(); }
    }
    if (stateCode == "Draft") {
        this.view.getControlByElementId('CancelledToDraft').hideElement();
        this.view.getControlByElementId('DraftToCancelled').showElement();
        this.view.getControlByElementId('DraftToIssued').showElement();
        this.view.getControlByElementId('IssuedToDraft').hideElement();
        this.view.getControlByElementId('CancelledToDraftOperations').hideElement();
    }
    if (stateCode == "Issued") {
        this.view.getControlByElementId('CancelledToDraft').hideElement();
        this.view.getControlByElementId('DraftToCancelled').hideElement();
        this.view.getControlByElementId('DraftToIssued').hideElement();
        this.view.getControlByElementId('IssuedToDraft').showElement();
        this.view.getControlByElementId('CancelledToDraftOperations').hideElement();
    }

    // disable/enable elements
    if (!isSaveAvailable) {
        await this.view.disableAllElements();
        if (isOperationsUser && stateCode == "Issued")
        { this.view.getControlByElementId('IssuedToDraft').enableElement(); }
        if (isOperationsUser && stateCode == "Cancelled") {
            this.view.getControlByElementId('CancelledToDraftOperations').enableElement();
        }
    }
    else {
        if (stateCode == "Cancelled") {
            this.view.getControlByElementId('attachmentErrorArray').disableElement();
            this.view.getControlByElementId('attachmentErrorComment').disableElement();
            this.view.getControlByElementId('attachmentErrorCommentSales').enableElement();
            this.view.getControlByElementId('CancelledToDraft').enableElement();
            this.view.getControlByElementId('DraftToCancelled').disableElement();
            this.view.getControlByElementId('DraftToIssued').disableElement();
            this.view.getControlByElementId('IssuedToDraft').disableElement();
        }
        if (stateCode == "Draft") {
            this.view.getControlByElementId('attachmentErrorArray').enableElement();
            this.view.getControlByElementId('attachmentErrorComment').enableElement();
            this.view.getControlByElementId('attachmentErrorCommentSales').disableElement();
            this.view.getControlByElementId('CancelledToDraft').disableElement();
            this.view.getControlByElementId('DraftToCancelled').enableElement();
            this.view.getControlByElementId('DraftToIssued').enableElement();
            this.view.getControlByElementId('IssuedToDraft').disableElement();
        }
    }
    if (stateCode == "Cancelled") {
        // enable CancelledToDraft always
        this.view.getControlByElementId('CancelledToDraft').enableElement();
    }

};
