'use strict';

module.exports = function onChangeManualCorrection(input, ambientProperties) {

    this.view.validate();
    this.view.reevaluateRules();
    this.view.rebind();
};
