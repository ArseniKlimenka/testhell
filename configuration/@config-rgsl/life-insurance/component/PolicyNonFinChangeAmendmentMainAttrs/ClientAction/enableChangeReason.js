'use strict';

const { initiator } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function enableChangeReason(input, ambientProperties) {

    if (!isSaveOperationAvailable(this.view)) {

        return false;
    }

    const currentInitiator = input.componentContext.initiator;
    return currentInitiator === initiator.insurer;
};
