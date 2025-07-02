'use strict';

module.exports = function manualRateRequestMapping(input) {

    const searchCriteria = {
        productCode: input.additionalContext?.productCode,
        insuranceTerms: input.additionalContext?.insuranceTerms,
        maxVersion: true
    };

    return {
        data: {
            criteria: searchCriteria
        }
    };
};
