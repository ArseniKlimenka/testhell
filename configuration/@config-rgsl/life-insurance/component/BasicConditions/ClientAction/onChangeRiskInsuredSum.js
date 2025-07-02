'use strict';

const { resetGiftServices } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');

module.exports = function onChangeRiskInsuredSum(input, ambientProperties) {

    const basicConditions = input.componentContext;
    basicConditions.riskPremium = null;

    resetGiftServices(input);

    this.view.validate();
    this.view.reevaluateRules();
    this.view.rebind();

};
