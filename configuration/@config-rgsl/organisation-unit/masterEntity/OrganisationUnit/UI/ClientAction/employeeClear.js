'use strict';

module.exports = function employeeClear(input) {

    const dataProperty = input.dataProperty;
    input.context.Body[`${dataProperty}`] = {};

    this.view.rebind();
    this.view.validate();
    this.view.reevaluateRules();

};
