'use strict';

module.exports = function orgUnitNameClear(input) {

    input.context.Body.orgUnitName = undefined;
    input.context.Body.orgUnitCode = undefined;

    this.view.validate();
    this.view.reevaluateRules();

};
