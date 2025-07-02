'use strict';

const { LifeAmendmentCancellationBeforeSaveMapping } = require('@config-rgsl/life-insurance/lib/lifeAmendmentCancellationHelper');

module.exports = async function LifeAmendmentCancellationBeforeSave(input, ambientProperties) {

    this.view.startBlockingUI();

    try {

        await LifeAmendmentCancellationBeforeSaveMapping(input, ambientProperties, this);
    }
    catch (error) {

        this.view.stopBlockingUI();
        throw error;
    }

    await this.view.evaluate(['/selectedClaimRisks[GetClaimSelectedRisks]'], false, true);

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
    this.view.stopBlockingUI();
};
