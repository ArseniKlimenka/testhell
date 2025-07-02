'use strict';

module.exports = function onIsManualBugedRuleChanged(input) {

    this.view.validate();
    this.view.reevaluateRules();
    this.view.rebind();
};
