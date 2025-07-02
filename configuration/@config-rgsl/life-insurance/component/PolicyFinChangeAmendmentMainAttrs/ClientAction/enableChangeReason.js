'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { initiator } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

module.exports = function enableChangeReason(input, ambientProperties) {

    if (!isSaveOperationAvailable(this.view)) {

        return false;
    }

    const currentInitiator = input.componentContext.initiator;
    return currentInitiator === initiator.insurer;
};
