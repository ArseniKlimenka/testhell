'use strict';

module.exports = function isCollectivePolicy(input) {

    const configuration = input.rootContext.ConfigurationCodeName;
    return configuration === 'CollectiveLifeInsurancePolicy';
};
