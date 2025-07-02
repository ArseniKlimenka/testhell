'use strict';

module.exports = function shouldShowCreditPolicyAttachments(input) {

    const configurationName = input.context.OriginalConfigurationCodeName;
    return configurationName === "CreditLifeInsurancePolicy" && input.rootContext.ClientViewModel.shouldShowPolicyAttachments;
};
