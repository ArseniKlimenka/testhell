const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

module.exports = async function LifeAmendmentReactivationOnLoad(input, ambientProperties) {

    this.view.startBlockingUI();

    amendmentUtils.validateReactivationAvailability(input, ambientProperties, this.view);

    this.view.validate();
    this.view.reevaluateRules();
    this.view.stopBlockingUI();
};
