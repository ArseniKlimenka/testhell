'use strict';

module.exports = function onHasTaxDeductionCertificateChanged(input) {

    input.rowContext.isClaimed = undefined;
    input.rowContext.amount = undefined;

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
