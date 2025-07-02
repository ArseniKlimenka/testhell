'use strict';

module.exports = function onChangeDocType(input, ambientProperties) {

    input.context.otherDocTypeDesc = undefined;

    this.view.reevaluateRules();
    this.view.validate();

};
