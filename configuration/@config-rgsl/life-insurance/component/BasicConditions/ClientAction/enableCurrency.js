'use strict';

const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { isSaveOperationAvailable, shouldDisableSaveableContract } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function enableCurrency(input, ambientProperties) {

    if (!isSaveOperationAvailable(this.view) || this.view.areAllElementsDisabled() || shouldDisableSaveableContract(input, this.view)) { return false; }

    const body = input.context.Body;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.componentContext.issueDate ?? dateTimeUtils.newDateAsString();

    if (!productCode) { return false; }

    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';
    const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate }) : body?.productConfiguration;

    const availableCurrencies = productConf?.availableCurrencies || [];

    if (availableCurrencies.length > 1) {
        return true;
    }
    return false;

};
