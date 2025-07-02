'use strict';

const { LifeAmendmentCancellationOnLoadMapping } = require('@config-rgsl/life-insurance/lib/lifeAmendmentCancellationHelper');

module.exports = async function LifeAmendmentCancellationOnLoad(input, ambientProperties) {

    this.view.startBlockingUI();

    try {

        await LifeAmendmentCancellationOnLoadMapping(input, ambientProperties, this);
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
