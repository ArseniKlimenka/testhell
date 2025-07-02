'use strict';

module.exports = function onChangeBranch(input, ambientProperties) {

    this.view.rebind();
    this.view.validate();
    this.view.reevaluateRules();
};
