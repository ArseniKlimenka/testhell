'use strict';

module.exports = async function partnerClear(input, ambientProperties) {

    input.context.partner = {};
    input.context.insuranceProduct = undefined;

    this.view.rebind();
    this.view.validate();
    this.view.reevaluateRules();
};
