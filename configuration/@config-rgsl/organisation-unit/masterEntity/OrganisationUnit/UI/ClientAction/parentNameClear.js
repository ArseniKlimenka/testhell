'use strict';

module.exports = function parentNameClear(input) {

    input.context.Body.parentName = undefined;
    input.context.Body.parentCode = undefined;
    input.context.ParentId = undefined;

    this.view.validate();
    this.view.reevaluateRules();

};
