'use strict';

module.exports = function shouldShowInvestPolicyAttachments(input) {

    const configurationName = input.context.OriginalConfigurationCodeName;
    return configurationName === "InvestmentLifeInsurancePolicy" && input.rootContext.ClientViewModel.shouldShowPolicyAttachments;
};
