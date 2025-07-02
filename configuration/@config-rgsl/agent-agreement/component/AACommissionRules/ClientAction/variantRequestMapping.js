'use strict';

module.exports = function variantRequestMapping(input, ambientProperties) {

    const selectedProducts = input.context.insuranceProduct?.values ?? [];
    const searchCriteria = {};

    if (selectedProducts.length > 0) {

        if (!input.searchText) {

            searchCriteria.productCodes = [];
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
