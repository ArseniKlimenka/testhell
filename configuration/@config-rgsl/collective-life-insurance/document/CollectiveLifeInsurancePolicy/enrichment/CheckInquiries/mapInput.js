'use strict';

module.exports = function mapping(input) {

    return {
        data: {
            criteria: {
                quoteNumber: this.businessContext.documentNumber,
                isCollectivePolicy: true,
                policyReviewNumber: input.technicalInformation.policyReviewNumber
            }
        }
    };
};
