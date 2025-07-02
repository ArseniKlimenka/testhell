const { isSaveOperationAvailable, shouldDisableSaveableContract } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function enableExchangeRate(input, ambientProperties) {

    const isFixedRate = input.componentContext.isFixedRate ?? false;
    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';

    return isFixedRate &&
    isCollectivePolicy &&
    !this.view.areAllElementsDisabled() &&
    isSaveOperationAvailable(this.view) &&
    !shouldDisableSaveableContract(input, this.view);
};
