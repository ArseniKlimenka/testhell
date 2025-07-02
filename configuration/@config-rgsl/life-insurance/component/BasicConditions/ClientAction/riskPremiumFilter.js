'use strict';

const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function riskPremiumFilter(input, ambientProperties) {

    let result = input.items;
    const body = input.context.Body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const paymentFrequencyCode = input.componentContext.paymentFrequency?.paymentFrequencyCode;
    const insuranceTerms = input.componentContext.insuranceTerms;

    if (!productCode || !paymentFrequencyCode || !insuranceTerms) {
        return [];
    }

    const issueDate = input.componentContext.issueDate ?? dateTimeUtils.newDateAsString();

    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';
    const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate }) : body?.productConfiguration;
    const fixedPremiums = productConf?.fixedPremiums;
    const availableFixedPremiums = fixedPremiums && fixedPremiums[paymentFrequencyCode] && (fixedPremiums[paymentFrequencyCode][insuranceTerms] || fixedPremiums[paymentFrequencyCode]['any']) || [];

    result = result.filter(item => availableFixedPremiums.includes(item.value));

    return result;

};
