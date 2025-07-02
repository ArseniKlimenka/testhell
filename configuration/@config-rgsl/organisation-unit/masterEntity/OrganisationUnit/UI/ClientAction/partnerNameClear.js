'use strict';

module.exports = function partnerNameClear(input) {

    input.context.Body.partnerName = undefined;
    input.context.Body.partnerCode = undefined;

    this.view.validate();
    this.view.reevaluateRules();

};
