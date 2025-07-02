'use strict';

const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function showMonthTerms(input, ambientProperties) {

    const body = input.context.Body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.componentContext.issueDate ?? dateTimeUtils.newDateAsString();

    if (!productCode) {
        return false;
    }

    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';
    const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate }) : body?.productConfiguration;

    const availableInsuranceTermsMonths = productConf?.insuranceTermsMonths;
    const isWholeLife = productConf?.isWholeLife;

    if (isWholeLife) {
        return false;
    }

    if (availableInsuranceTermsMonths && availableInsuranceTermsMonths.length > 0) {
        return true;
    }

    return false;

};
