'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');

module.exports = function isReinvestAvailable(input, ambientProperties) {

    const body = input.context.Body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.componentContext.issueDate;

    const issueFormCode = body?.issueForm?.code?.issueFormCode;
    const isEPolicy = issueFormCode == 'ePolicy';
    const isReinvest = lifeInsuranceConstants.productGroupArray.REINVEST.includes(productCode);

    if (!productCode || !issueDate || (isEPolicy && !isReinvest)) {
        return false;
    }

    if (isReinvest) {
        input.componentContext.isReinvest = true;
    }

    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';
    const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate }) : body?.productConfiguration;
    const isReinvestAvailable = productConf?.isReinvestAvailable ?? false;

    return isReinvestAvailable;
};
