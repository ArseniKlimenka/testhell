'use strict';

const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function insuranceTermsMonthsFilter(input, ambientProperties) {

    let result = input.items;
    const body = input.context.Body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.componentContext.issueDate ?? dateTimeUtils.newDateAsString();

    if (!productCode) {
        return result;
    }

    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';
    let availableInsuranceTermsMonths = isCollectivePolicy ? confCorp({ productCode, issueDate })?.insuranceTermsMonths : body?.productConfiguration?.insuranceTermsMonths;
    availableInsuranceTermsMonths = availableInsuranceTermsMonths ? availableInsuranceTermsMonths : [];

    result = result.filter(item => availableInsuranceTermsMonths.includes(item)).reverse();

    return result;

};
