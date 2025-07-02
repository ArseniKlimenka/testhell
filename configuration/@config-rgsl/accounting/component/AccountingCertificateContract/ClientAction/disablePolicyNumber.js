'use strict';

module.exports = function disablePolicyNumber(input, ambientProperties) {

    const policyWasFound = input.context?.Body?.technicalInformation?.policyWasFound;

    return policyWasFound;
};
