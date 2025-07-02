'use strict';

module.exports = function showAdditionalInvestmentParameters(input, ambientProperties) {

    const rateOfReturnRulesEquityActivesClient = input.context?.ClientViewModel?.rateOfReturnRulesEquityActives;
    const manualRate = input.componentContext?.rateOfReturnEquityActives?.manualRate;

    const showAdditionalInvestmentParameters = rateOfReturnRulesEquityActivesClient?.length > 0 || manualRate;

    return showAdditionalInvestmentParameters;
};
