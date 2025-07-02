'use strict';

module.exports = function shouldShowMedPolicyAttachments(input) {

    const configurationName = input.context.OriginalConfigurationCodeName;
    return configurationName === "MedLifeInsurancePolicy" && input.rootContext.ClientViewModel.shouldShowPolicyAttachments;
};
