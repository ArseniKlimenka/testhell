'use strict';

module.exports = function onShouldUseNettingChanged(input) {

    const shouldUseNetting = input.context.Body.claimAmounts.shouldUseNetting;

    if (shouldUseNetting) {

        delete input.context.Body.claimAmounts.nonAcceptance;
        delete input.context.Body.claimAmounts.numberOfNonAcceptancePayment;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
