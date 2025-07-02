'use strict';

/* eslint no-undef: "off"*/

module.exports = async function beforeSaveDocumentAction(input, ambientProperties) {

    this.view.startBlockingUI();

    if (!input.context.Body.selectedClaimRisks) {
        input.Body.selectedClaimRisks = [];
    }

    if (input.context.Body.selectedClaimRisks) {
        await this.view.evaluate(['/selectedClaimRisks[GetClaimSelectedRisks]'], false, true);
    }

    this.view.stopBlockingUI();

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
