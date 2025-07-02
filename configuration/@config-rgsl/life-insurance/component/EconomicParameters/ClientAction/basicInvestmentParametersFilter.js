'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function basicInvestmentParametersFilter(input, ambientProperties) {

    const basicInvestmentParameters = input.items;

    const policyIssueDateEnd = input.data.policyIssueDateEnd;
    const policyIssueDateStart = input.data.policyIssueDateStart;
    const subObject = 'value';

    let availableBasicInvestmentParameters = DateTimeUtils.filterDateRanges(basicInvestmentParameters, policyIssueDateStart, policyIssueDateEnd, subObject);

    const currencyCode = input.data?.currency?.currencyCode;

    if (currencyCode) {
        availableBasicInvestmentParameters = availableBasicInvestmentParameters.filter(i => i.value.currencyCode == currencyCode);
    }

    availableBasicInvestmentParameters = availableBasicInvestmentParameters.filter((item, index, self) =>
        index === self.findIndex((i) => (
            i.value.strategyCode === item.value.strategyCode
        ))
    );

    return availableBasicInvestmentParameters;
};
