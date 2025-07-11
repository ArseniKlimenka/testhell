'use strict';

module.exports = async function beforeSaveDocumentAction(input, ambientProperties) {

    this.view.startBlockingUI();

    await this.view.evaluate(['/selectedClaimRisks[GetClaimSelectedRisks]'], false, true);

    this.view.stopBlockingUI();

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
