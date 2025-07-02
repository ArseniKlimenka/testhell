'use strict';

const { sportProducts } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showDaysBetweenIssueAndStartDynamic(input, ambientProperties) {

    const body = input.context.Body;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;

    if (!productCode) {
        return false;
    }

    if (sportProducts.includes(productCode)) {
        return true;
    }

    return false;
};
