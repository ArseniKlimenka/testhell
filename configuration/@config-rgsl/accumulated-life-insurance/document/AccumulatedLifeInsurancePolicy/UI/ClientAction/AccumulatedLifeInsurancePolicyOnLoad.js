'use strict';

const {
    isSaveOperationAvailable,
    shouldDisableSaveableContract,
    isVersionApplied,
    hideSaveButton,
    createMedLifeInsuranceQuoteFromAccumulated,
    checkDateForCreateMed
} = require('@config-rgsl/infrastructure/lib/UIUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { getCurrentActivity } = require('@config-rgsl/life-insurance/lib/ePolicyVerificationHelper');
const { disableTabs } = require('@config-rgsl/life-insurance/lib/uiHelper');
const { policyState, actor } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = async function AccumulatedLifeInsurancePolicyOnLoad(input, ambientProperties) {

    const hideSaveForActors = [actor.Agent, actor.Operations];
    const hideSaveInStates = [policyState.Active];
    await hideSaveButton(input, ambientProperties, this, hideSaveInStates, hideSaveForActors);

    if (isVersionApplied(this.view)) {
        await this.view.disableValidation();
    }

    if (!isSaveOperationAvailable(this.view) || shouldDisableSaveableContract(input, this.view)) {

        const tabLayout = this.view.getControlByElementId('TabLayout');
        disableTabs(tabLayout);
    }

    // for case when we show attachments on LifeInsuranceAttachmentVerification
    const parentView = this.view.getParentView();

    if (parentView &&
        input.rootContext.ConfigurationCodeName == "LifeInsuranceAttachmentVerification" &&
        isSaveOperationAvailable(parentView)) {

        await this.view.getControlByElementId('AttachmentsInlineView').enableElement();
    }

    let currentActivity = getValue(input, "context.ClientViewModel.currentActivity");

    if (!currentActivity) {

        await getCurrentActivity(input, ambientProperties);
        currentActivity = getValue(input, "context.ClientViewModel.currentActivity");
    }

    await checkDateForCreateMed(input, ambientProperties, this);
    await createMedLifeInsuranceQuoteFromAccumulated(input, ambientProperties, this);

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();

};
