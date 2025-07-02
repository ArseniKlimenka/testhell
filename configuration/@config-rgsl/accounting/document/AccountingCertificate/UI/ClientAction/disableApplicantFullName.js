'use strict';

module.exports = function disableApplicantFullName(input, ambientProperties) {

    return input.context?.Body?.isApplicantPolicyHolder;
};
