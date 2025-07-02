'use strict';

const {
    isSaveOperationAvailable,
    isVersionApplied,
    hideSaveButton
} = require('@config-rgsl/infrastructure/lib/UIUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { disableTabs } = require('@config-rgsl/life-insurance/lib/uiHelper');
const { policyState, actor } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = async function CreditLifeInsurancePolicyOnLoad(input, ambientProperties) {

    if (isVersionApplied(this.view)) {
        await this.view.disableValidation();
    }

    if (!isSaveOperationAvailable(this.view)) {
        const tabLayout = this.view.getControlByElementId('TabLayout');
        disableTabs(tabLayout);
    }

    // Enable save button in configuration for Operations for sink to create attachment and send mail
    // Hide save button in UI for Operations
    const hideSaveForActors = [actor.Operations];
    const hideSaveInStates = [policyState.Draft, policyState.Active];
    await hideSaveButton(input, ambientProperties, this, hideSaveInStates, hideSaveForActors);

    // for case when we show attachments on LifeInsuranceAttachmentVerification
    const parentView = this.view.getParentView();


    if (parentView &&
        input.rootContext.ConfigurationCodeName == "LifeInsuranceAttachmentVerification" &&
        isSaveOperationAvailable(parentView)) {

        await this.view.getControlByElementId('AttachmentsInlineView').enableElement();
    }

    const productCode = getValue(input, 'context.Body.mainInsuranceConditions.insuranceProduct.productCode');
    const availableTransitions = getValue(input, 'context.AvailableTransitions', []);
    if (productCode == 'CACB' && availableTransitions.find(x => x.Name == 'Draft_to_Active')) {
        this.view.makeTransition('Draft_to_Active');
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();

};
