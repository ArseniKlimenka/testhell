'use strict';

module.exports = function variantRequestMapping(input, ambientProperties) {

    const productCode = input.context?.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const searchCriteria = {};

    if (productCode) {

        if (!input.searchText) {

            searchCriteria.productCode = productCode;
        }
        else if (input.searchText) {

            searchCriteria.searchText = input.searchText;
        }

        return {
            data: {
                criteria: searchCriteria
            }
        };
    }

};
