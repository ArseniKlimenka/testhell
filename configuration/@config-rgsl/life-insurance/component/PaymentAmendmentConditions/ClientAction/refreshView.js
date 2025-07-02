'use strict';

module.exports = function refreshView(input) {

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
