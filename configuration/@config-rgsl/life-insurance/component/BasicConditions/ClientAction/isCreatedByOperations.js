const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function isCreatedByOperations(input, ambientProperties) {

    if (ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy') {
        return false;
    }

    return getValue(input, 'context.Body.technicalInformation.isCreatedByOperations') && isSaveOperationAvailable(this.view);
};
