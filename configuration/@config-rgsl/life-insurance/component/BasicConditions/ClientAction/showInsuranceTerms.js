'use strict';

const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showInsuranceTerms(input, ambientProperties) {

    const body = input.context.Body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.componentContext.issueDate ?? dateTimeUtils.newDateAsString();

    if (!productCode) {
        return false;
    }

    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';
    const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate }) : body?.productConfiguration;

    const withTarification = input.componentContext.withTarification ?? false;

    if (isCollectivePolicy && !withTarification) {
        return false;
    }

    const showEndowmentPaymentVariantForProductCodes = productGroupArray.RHE.includes(productCode);
    if (showEndowmentPaymentVariantForProductCodes) {
        return false;
    }

    const isWholeLife = productConf.isWholeLife;

    if (isWholeLife) {
        return true;
    }

    return false;

};
