const constants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function enableStartDate(input, ambientProperties) {

    const manualCorrection = input.data.manualCorrection ?? false;
    const isCollectivePolicy = ambientProperties.configurationCodeName == constants.productCode.CollectiveLifeInsurancePolicy;

    return (manualCorrection || isCollectivePolicy) && isSaveOperationAvailable(this.view);
};
