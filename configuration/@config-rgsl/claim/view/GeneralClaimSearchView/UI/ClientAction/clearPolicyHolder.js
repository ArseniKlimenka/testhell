'use strict';

module.exports = function clearPolicyHolder(input) {

    if (input.context.request.data.criteria.policyHolderCode) {

        input.context.request.data.criteria.policyHolderCode = undefined;
        input.context.request.data.criteria.policyHolderFullName = undefined;
    }
};
