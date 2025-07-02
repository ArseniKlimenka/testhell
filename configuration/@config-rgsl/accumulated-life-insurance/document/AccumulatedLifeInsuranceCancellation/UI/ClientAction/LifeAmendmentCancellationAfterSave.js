'use strict';

const { LifeAmendmentCancellationAfterSaveMapping } = require('@config-rgsl/life-insurance/lib/lifeAmendmentCancellationHelper');

module.exports = async function LifeAmendmentCancellationAfterSave(input, ambientProperties) {

    this.view.startBlockingUI();

    try {

        await LifeAmendmentCancellationAfterSaveMapping(input, ambientProperties, this);
    }
    catch (error) {

        this.view.stopBlockingUI();
        throw error;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
    this.view.stopBlockingUI();
};
