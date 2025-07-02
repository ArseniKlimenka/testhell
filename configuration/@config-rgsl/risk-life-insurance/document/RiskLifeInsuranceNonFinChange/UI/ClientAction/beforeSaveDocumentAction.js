'use strict';

/* eslint no-undef: "off"*/

const { updateChangesRelatedData } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentHelper');

module.exports = async function beforeSaveDocumentAction(input, ambientProperties) {

    this.view.startBlockingUI();

    await updateChangesRelatedData(input, this.view).catch(error => {

        this.view.stopBlockingUI();
        throw error;
    });

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
