'use strict';

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function creditProgramFilter(input, ambientProperties) {

    let result = input.items;
    const body = input.context.Body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body?.basicConditions?.issueDate ?? dateTimeUtils.newDateAsString();

    if (!productCode) {
        return result;
    }

    const availableCreditPrograms = body?.productConfiguration?.creditPrograms ?? [];

    result = result.filter(item => availableCreditPrograms.includes(item));

    return result;

};
