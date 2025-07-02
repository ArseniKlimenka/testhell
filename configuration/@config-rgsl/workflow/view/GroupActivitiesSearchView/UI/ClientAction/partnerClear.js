'use strict';

module.exports = function partnerClear(input) {

    input.context.request.data.criteria.partner = {};

    this.view.rebind();
    this.view.validate();
    this.view.reevaluateRules();

};
