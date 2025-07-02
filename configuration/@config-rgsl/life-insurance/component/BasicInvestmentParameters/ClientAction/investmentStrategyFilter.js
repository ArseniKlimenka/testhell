'use strict';

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function investmentStrategyFilter(input) {

    let result = input.items;
    const body = input.context.Body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body?.basicConditions?.issueDate ?? dateTimeUtils.newDateAsString();

    if (!productCode) {
        return result;
    }

    const availableStrategy = body?.productConfiguration?.strategy;

    result = result.filter(item => availableStrategy.includes(item.investmentStrategyCode));

    return result;

};
