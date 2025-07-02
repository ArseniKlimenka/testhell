'use strict';

module.exports = function basicInvestmentParametersRequestMapping(input) {

    const productCode = input.data.insuranceProduct.productCode;

    const searchCriteria = {};

    searchCriteria.productCode = productCode;
    searchCriteria.maxVersion = true;

    return {
        data: {
            criteria: searchCriteria
        }
    };
};
