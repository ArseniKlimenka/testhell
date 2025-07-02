'use strict';

const { updateChangesRelatedData } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentHelper');

module.exports = async function beforeSaveDocumentAction(input, ambientProperties) {

    this.view.startBlockingUI();

    await this.view.evaluate(['/selectedClaimRisks[GetClaimSelectedRisks]'], false, true);

    await updateChangesRelatedData(input, this.view).catch(error => {

        this.view.stopBlockingUI();
        throw error;
    });

    this.view.stopBlockingUI();

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
