'use strict';

const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function insuranceTermsFilter(input, ambientProperties) {

    let result = input.items;
    const body = input.context.Body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.componentContext.issueDate ?? dateTimeUtils.newDateAsString();

    if (!productCode) {
        return result;
    }

    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';
    const availableInsuranceTerms = isCollectivePolicy ? confCorp({ productCode, issueDate })?.insuranceTerms : body?.productConfiguration?.insuranceTerms;

    result = result.filter(item => availableInsuranceTerms.includes(item));

    return result;

};
