'use strict';

module.exports = function onEffectiveDateChange(input, ambientProperties) {

    this.view.save();
    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
