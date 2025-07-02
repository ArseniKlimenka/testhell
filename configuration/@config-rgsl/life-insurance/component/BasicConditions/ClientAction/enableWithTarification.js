'use strict';

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const constants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { getProductConfiguration } = require('@config-rgsl/life-insurance/lib//productConfigurationHelper');

module.exports = async function enableWithTarification(input, ambientProperties) {

    const body = input.context.Body;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.componentContext.issueDate ?? dateTimeUtils.newDateAsString();

    if (!productCode) {
        return false;
    }

    const isCollectivePolicy = ambientProperties.configurationCodeName == constants.productCode.CollectiveLifeInsurancePolicy;
    const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate }) : await getProductConfiguration(ambientProperties, productCode, issueDate);

    return productConf?.withTarification && isSaveOperationAvailable(this.view);
};
