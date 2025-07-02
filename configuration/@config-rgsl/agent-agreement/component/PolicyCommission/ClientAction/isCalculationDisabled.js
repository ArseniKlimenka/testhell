'use strict';

module.exports = function isCalculationDisabled(input) {

    if (this.view.areAllElementsDisabled()) {

        return true;
    }

    const agentAgreementNumber = input.componentContext?.agentAgreement?.number;
    const configuration = input.rootContext.ConfigurationCodeName;

    return !agentAgreementNumber || configuration === 'CreditLifeInsurancePolicy';
};
