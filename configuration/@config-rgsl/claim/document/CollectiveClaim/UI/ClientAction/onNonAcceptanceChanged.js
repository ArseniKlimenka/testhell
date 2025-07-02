'use strict';

module.exports = function onNonAcceptanceChanged(input) {

    const nonAcceptance = input.context.Body.claimAmounts.nonAcceptance;

    if (nonAcceptance) {

        delete input.context.Body.claimAmounts.shouldUseNetting;
    }
    else {

        delete input.context.Body.claimAmounts.numberOfNonAcceptancePayment;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
