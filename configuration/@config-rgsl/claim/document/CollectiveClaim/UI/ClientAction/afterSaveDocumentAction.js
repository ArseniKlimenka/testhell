'use strict';

module.exports = async function afterSaveDocumentAction(input) {

    this.view.startBlockingUI();

    await this.view.evaluate(['[GetDuplicatedClaims]'], false, true);
    await this.view.evaluate(['[GetPolicyOpenAmountData]'], false, true);
    await this.view.evaluate(['[GetPolicyCancellationData]'], false, true);

    this.view.setClean();
    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
    this.view.stopBlockingUI();
};
