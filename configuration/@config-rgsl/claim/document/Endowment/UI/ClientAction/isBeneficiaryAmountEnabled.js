'use strict';

module.exports = function isBeneficiaryAmountEnabled(input, ambientProperties) {

    const currentActor = ambientProperties.currentWorkUnitActor;
    const calculateFromAmount = input.rowContext.calculateFromAmount ?? false;
    return calculateFromAmount && currentActor !== 'Accounting';
};
