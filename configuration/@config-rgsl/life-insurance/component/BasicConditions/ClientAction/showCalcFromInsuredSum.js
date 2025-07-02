'use strict';

const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const { setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function showCalcFromInsuredSum(input, ambientProperties) {

    const body = input.context.Body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.componentContext.issueDate ?? dateTimeUtils.newDateAsString();

    if (!productCode) {
        return false;
    }

    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';
    const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate }) : body?.productConfiguration;

    const allowCalcFromInsuredSum = productConf?.allowCalcFromInsuredSum;
    const allowCalcFromPremium = productConf?.allowCalcFromPremium;

    if (allowCalcFromInsuredSum && !allowCalcFromPremium) {
        input.componentContext.calcFromInsuredSum = true;
        return false;
    }

    if (!allowCalcFromInsuredSum && allowCalcFromPremium) {
        input.componentContext.calcFromInsuredSum = false;
        return false;
    }

    return true;

};
