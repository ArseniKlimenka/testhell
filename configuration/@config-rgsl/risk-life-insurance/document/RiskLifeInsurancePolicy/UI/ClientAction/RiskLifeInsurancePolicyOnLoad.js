const { isSaveOperationAvailable, shouldDisableSaveableContract, isVersionApplied } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { disableTabs } = require('@config-rgsl/life-insurance/lib/uiHelper');

module.exports = async function RiskLifeInsurancePolicyOnLoad(input, ambientProperties) {

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

};
