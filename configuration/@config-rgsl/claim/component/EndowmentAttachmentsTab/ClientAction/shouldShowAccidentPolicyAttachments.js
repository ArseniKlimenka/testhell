'use strict';

const { checkShouldShowAttachments } = require('@config-rgsl/claim-base/lib/claimClientHelper');
const { policyConfigurationNames } = require('@config-rgsl/life-insurance/lib/commonLifeInsuranceConstants');

module.exports = function shouldShowAccidentPolicyAttachments(input) {

    const result = checkShouldShowAttachments(input, policyConfigurationNames.accidentLifeInsurancePolicy);
    return result;
};
