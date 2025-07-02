const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { isSaveOperationAvailable, shouldDisableSaveableContract } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function enableRateData(input, ambientProperties) {

    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';

    const body = input.context.Body;
    const productCode = getValue(body, 'mainInsuranceConditions.insuranceProduct.productCode');
    const currencyNumericCode = input.componentContext.currency?.currencyNumericCode ?? '643';

    return productCode &&
        isCollectivePolicy &&
        currencyNumericCode != '643' &&
        !this.view.areAllElementsDisabled() &&
        isSaveOperationAvailable(this.view) &&
        !shouldDisableSaveableContract(input, this.view);
};
