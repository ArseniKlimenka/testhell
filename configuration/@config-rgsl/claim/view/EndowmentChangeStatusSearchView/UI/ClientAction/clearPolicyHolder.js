'use strict';

module.exports = function clearPolicyHolder(input) {

    input.context.request.data.criteria.policyHolderCode = undefined;
    input.context.request.data.criteria.policyHolderType = undefined;
    input.context.request.data.criteria.policyHolderName = undefined;
};
