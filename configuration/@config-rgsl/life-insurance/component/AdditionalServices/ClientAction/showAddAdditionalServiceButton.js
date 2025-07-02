const constants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function showAddAdditionalServiceButton(input, ambientProperties) {

    const isCollectivePolicy = ambientProperties.configurationCodeName == constants.productCode.CollectiveLifeInsurancePolicy;

    return isCollectivePolicy && isSaveOperationAvailable(this.view);
};
