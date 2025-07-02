'use strict';

const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showYearTerms(input, ambientProperties) {

    const body = input.context.Body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.componentContext.issueDate ?? dateTimeUtils.newDateAsString();

    if (!productCode) {
        return false;
    }

    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';
    const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate }) : body?.productConfiguration;
    const withTarification = input.componentContext.withTarification;

    if (isCollectivePolicy && !withTarification) {
        return false;
    }

    const showForProductCodes = productGroupArray.RHE.includes(productCode);
    if (showForProductCodes) {
        return true;
    }

    const availableInsuranceTerms = productConf.insuranceTerms;
    const isWholeLife = productConf.isWholeLife;

    if (isWholeLife) { return false; }
    if (availableInsuranceTerms && availableInsuranceTerms.length > 0) {
        return true;
    }

    return false;

};
