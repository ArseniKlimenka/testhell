'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            quoteNumber: null,
            isCollectivePolicy: false
        },
        sort: {
            'SYS_CREATED_ON': 'asc'
        }
    };

    if (input.data && input.data.criteria) {

        if (input.data.criteria.quoteNumber && input.data.criteria.quoteNumber.length > 0) {
            output.parameters.quoteNumber = input.data.criteria.quoteNumber;
        }

        if (input.data.criteria.isCollectivePolicy) {
            output.parameters.isCollectivePolicy = input.data.criteria.isCollectivePolicy;
        }

        if (input.data.criteria.policyReviewNumber) {
            output.parameters.policyReviewNumber = input.data.criteria.policyReviewNumber;
        }
    }

    return output;
};
