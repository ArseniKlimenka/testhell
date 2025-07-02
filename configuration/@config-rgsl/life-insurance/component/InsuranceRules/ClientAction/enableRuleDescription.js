const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function enableRuleDescription(input, ambientProperties) {

    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';
    const isOperations = ambientProperties.currentWorkUnitActor == 'Operations';

    return isSaveOperationAvailable(this.view) && isCollectivePolicy && isOperations;
};
