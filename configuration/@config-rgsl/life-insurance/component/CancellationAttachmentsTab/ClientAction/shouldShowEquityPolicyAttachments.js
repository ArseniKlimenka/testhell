'use strict';

module.exports = function shouldShowEquityPolicyAttachments(input) {

    const configurationName = input.context.OriginalConfigurationCodeName;
    return configurationName === "EquityLifeInsurancePolicy" && input.rootContext.ClientViewModel.shouldShowPolicyAttachments;
};
