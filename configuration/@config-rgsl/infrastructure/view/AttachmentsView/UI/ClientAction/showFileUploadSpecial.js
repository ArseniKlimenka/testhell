'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function showFileUploadSpecial(input, ambientProperties) {

    const parentView = this.view.getParentView();
    const parentViewContext = parentView && parentView.getContext();
    const body = parentViewContext?.Body;
    const configurationCodeName = parentViewContext.ConfigurationCodeName;
    const contractType = parentViewContext.Dimensions && parentViewContext.Dimensions.contractType;
    const amendmentType = parentViewContext.Dimensions && parentViewContext.Dimensions.amendmentType;
    const dataProperty = input.dataProperty;
    const uwTriggersExist = body?.uwTriggers?.length > 0;
    const BFKOPartner = body?.mainInsuranceConditions?.partner?.partnerBusinessCode == '249411';
    const issueFormCode = body?.issueForm?.code?.issueFormCode;
    const isEPolicy = issueFormCode == 'ePolicy';
    const isOffer = issueFormCode == 'offer';

    const isExternalView = input.rootContext.ConfigurationCodeName !== input.context.ConfigurationCodeName;
    const shouldHideExternalFileUploadSpecial = input.rootContext?.ClientViewModel?.shouldHideExternalFileUploadSpecial;

    if (shouldHideExternalFileUploadSpecial && isExternalView) {

        return false;
    }

    if (!checkCommonVisibility(parentView)) { return false; }
    if (!checkActorVisibility(parentViewContext)) { return false; }

    if (contractType == 'Policy' && ['contractSigned'].includes(dataProperty) && isEPolicy == false && isOffer == false) {
        return true;
    }

    if (contractType == 'Policy' && ['servicesMemo'].includes(dataProperty)) {
        return true;
    }

    if (contractType == 'Quote' && ['application'].includes(dataProperty) && uwTriggersExist) {
        return true;
    }

    if (BFKOPartner && (contractType == 'Policy' || contractType == 'Quote') && ['bankNotification'].includes(dataProperty)) {
        return true;
    }

    if (configurationCodeName == 'NaturalPerson' && ['passport', 'financialQuestionary'].includes(dataProperty)) {
        return true;
    }

    if (contractType === "Amendment" && amendmentType === "NonFinancialChange" && ['changeApplication'].includes(dataProperty)) {
        return true;
    }

    if (contractType === "Amendment" && amendmentType === "Cancellation") {
        return false;
    }

    if (configurationCodeName == 'ContractEntity' && ['supportingDocument'].includes(dataProperty)) {
        return true;
    }

    return false;

    function checkCommonVisibility(parentView) {

        const parentViewContext = parentView && parentView.getParentView() && parentView.getParentView().getContext() || {};

        // on LifeInsuranceAttachmentVerification we need to hide fields if it's non-editable
        if (parentViewContext.ConfigurationCodeName == "LifeInsuranceAttachmentVerification") {
            return isSaveOperationAvailable(parentView.getParentView());
        }

        return true;

    }

    function checkActorVisibility(parentViewContext) {
        return !['Viewer', 'PartyViewer'].includes(parentViewContext?.WorkUnitActor?.CurrentActor);
    }

};
