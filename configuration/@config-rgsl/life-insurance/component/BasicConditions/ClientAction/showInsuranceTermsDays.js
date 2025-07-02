'use strict';

const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function showInsuranceTermsDays(input, ambientProperties) {

    const body = input.context.Body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.componentContext.issueDate ?? dateTimeUtils.newDateAsString();

    if (!productCode) {
        return false;
    }

    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';
    const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate }) : body?.productConfiguration;

    const insuranceTermsDays = productConf?.insuranceTermsDays;
    const isWholeLife = productConf?.isWholeLife;

    if (isWholeLife) {
        return false;
    }

    if (insuranceTermsDays?.length > 0) {
        return true;
    }

    return false;
};
