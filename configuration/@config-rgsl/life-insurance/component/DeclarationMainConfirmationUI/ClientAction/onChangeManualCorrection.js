'use strict';

module.exports = function onChangeManualCorrection(input, ambientProperties) {

    this.view.rebind();
    this.view.reevaluateRules();
};
