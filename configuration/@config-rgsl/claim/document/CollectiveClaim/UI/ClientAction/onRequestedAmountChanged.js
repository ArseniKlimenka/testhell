'use strict';

module.exports = function onRequestedAmountChanged(input) {

    const requestedAmount = input.context.Body.claimAmounts.requestedClaimAmount;

    if (requestedAmount) {

        input.context.Body.claimAmounts.rznu = requestedAmount;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
