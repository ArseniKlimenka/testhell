'use strict';

module.exports = function isRecipientAmountEnabled(input, ambientProperties) {

    const calculateFromAmount = input.rowContext?.calculateFromAmount ?? false;
    const currentActor = ambientProperties.currentWorkUnitActor;
    return !!calculateFromAmount && currentActor !== 'Accounting';
};
