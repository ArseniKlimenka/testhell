'use strict';

module.exports = function partnerClear(input) {

    input.context.Body.partner = {};
    input.context.Body.insuranceProduct = undefined;

    this.view.rebind();
    this.view.validate();
    this.view.reevaluateRules();
};
