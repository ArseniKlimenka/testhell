'use strict';

module.exports = function onNonAcceptanceChanged(input) {

    const nonAcceptance = input.context.Body.endowmentAmounts.nonAcceptance;

    if (nonAcceptance) {

        delete input.context.Body.endowmentAmounts.shouldUseNetting;
    }
    else {

        delete input.context.Body.endowmentAmounts.numberOfNonAcceptancePayment;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
