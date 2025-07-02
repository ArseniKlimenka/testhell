'use strict';

module.exports = function shouldShowRiskPolicyAttachments(input) {

    const configurationName = input.context.OriginalConfigurationCodeName;
    return configurationName === "RiskLifeInsurancePolicy" && input.rootContext.ClientViewModel.shouldShowPolicyAttachments;
};
