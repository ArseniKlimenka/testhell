'use strict';

const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function paymentFrequencyFilter(input, ambientProperties) {

    let result = input.items;
    const body = input.context.Body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.componentContext?.issueDate ?? dateTimeUtils.newDateAsString();

    if (!productCode) {
        return result;
    }

    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';
    const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate }) : body?.productConfiguration;
    const availablePaymentFrequency = productConf?.paymentFrequency ?? [];

    result = result.filter(item => availablePaymentFrequency.includes(item.paymentFrequencyCode));

    return result;

};
