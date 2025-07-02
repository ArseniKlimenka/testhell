'use strict';

module.exports = function docTypeValueChanged(input, ambientProperties) {

    input.context.otherDocTypeDesc = undefined;

    this.view.reevaluateRules();
    this.view.validate();

};
