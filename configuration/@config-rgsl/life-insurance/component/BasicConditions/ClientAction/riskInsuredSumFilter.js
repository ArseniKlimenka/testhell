'use strict';

const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const { setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function riskInsuredSumFilter(input, ambientProperties) {

    let result = input.items;
    const body = input.context.Body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.componentContext.issueDate ?? dateTimeUtils.newDateAsString();

    if (!productCode) {
        input.componentContext.riskInsuredSum = undefined;
        return [];
    }

    const paymentFrequencyCode = input.componentContext.paymentFrequency?.paymentFrequencyCode;
    if (!paymentFrequencyCode) {
        input.componentContext.riskInsuredSum = undefined;
        return [];
    }

    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';
    const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate }) : body?.productConfiguration;

    const isWholeLife = productConf?.isWholeLife;
    const insuranceTerms = input.componentContext.insuranceTerms;
    const insuranceTermsDays = input.componentContext.insuranceTermsDays?.value;

    if (!insuranceTermsDays && !insuranceTerms && !isWholeLife) {
        input.componentContext.riskInsuredSum = undefined;
        return [];
    }

    const fixedInsuredSums = productConf?.fixedInsuredSums;
    const availableFixedInsuredSums = fixedInsuredSums && fixedInsuredSums[paymentFrequencyCode] && (fixedInsuredSums[paymentFrequencyCode][insuranceTerms] || fixedInsuredSums[paymentFrequencyCode]['any']) || [];

    result = result.filter(item => availableFixedInsuredSums.includes(item.value));

    return result;

};
