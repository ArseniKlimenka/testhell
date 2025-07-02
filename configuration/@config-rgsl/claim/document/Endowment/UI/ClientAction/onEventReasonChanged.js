'use strict';

const { setEndowmentPaymentLines } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');

module.exports = function onEventReasonChanged(input) {

    setEndowmentPaymentLines(input.context.Body);

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
