'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function strategyConfigurationFilter(input, ambientProperties) {

    const strategyConfigurations = input.items;

    const policyIssueDateEnd = input.data.policyIssueDateEnd;
    const policyIssueDateStart = input.data.policyIssueDateStart;
    const subObject = 'value';

    let availableStrategyConfigurations = DateTimeUtils.filterDateRanges(strategyConfigurations, policyIssueDateStart, policyIssueDateEnd, subObject);

    const currencyCode = input.data?.currency?.currencyCode;

    if (currencyCode) {
        availableStrategyConfigurations = availableStrategyConfigurations.filter(i => i.value.currencyCode == currencyCode);
    }

    return availableStrategyConfigurations;
};
