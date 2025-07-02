'use strict';

module.exports = async function onPaymentLinesManualCorrectionChanged(input, ambientProperties) {

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
