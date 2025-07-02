'use strict';

module.exports = function hideManualComm(input) {

    const configuration = input.rootContext.ConfigurationCodeName;
    return configuration === 'CreditLifeInsurancePolicy';
};
