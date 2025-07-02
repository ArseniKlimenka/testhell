'use strict';

module.exports = function manualRateRequestMapping(input) {

    const additionalContext = input.additionalContext;

    const productCode = additionalContext?.productCode;
    const issueDate = additionalContext?.issueDate;
    const insuranceTerms = additionalContext?.insuranceTerms;

    const searchCriteria = {};

    searchCriteria.productCode = productCode;
    searchCriteria.issueDate = issueDate;
    searchCriteria.insuranceTerms = insuranceTerms;
    searchCriteria.maxVersion = true;

    return {
        data: {
            criteria: searchCriteria
        }
    };
};
