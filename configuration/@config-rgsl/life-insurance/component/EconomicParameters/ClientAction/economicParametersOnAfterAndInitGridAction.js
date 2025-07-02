'use strict';

const { updateRuleNumbers, disableEditing } = require('@config-rgsl/life-insurance/lib/economicParametersHelper');

module.exports = function economicParametersOnAfterAndInitGridAction(input, ambientProperties) {

    const economicParameters = input.componentContext ?? [];
    disableEditing(input, ambientProperties, this);
    updateRuleNumbers(economicParameters);

    this.view.validate();
};
