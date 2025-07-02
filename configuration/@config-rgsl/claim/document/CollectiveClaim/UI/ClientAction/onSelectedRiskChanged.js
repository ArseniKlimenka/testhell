'use strict';

module.exports = function onSelectedRiskChanged(input) {

    const selectedRisk = input.context.Body.mainAttributes.selectedRisk;

    if (selectedRisk) {

        input.context.Body.claimAmounts.rznu = input.context.Body.claimAmounts.requestedClaimAmount;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
