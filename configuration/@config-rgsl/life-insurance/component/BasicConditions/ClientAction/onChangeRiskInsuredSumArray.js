'use strict';

module.exports = function onChangeRiskInsuredSumArray(input, ambientProperties) {

    const basicConditions = input.componentContext;
    basicConditions.riskPremium = null;

    this.view.validate();
    this.view.reevaluateRules();
    this.view.rebind();

};
