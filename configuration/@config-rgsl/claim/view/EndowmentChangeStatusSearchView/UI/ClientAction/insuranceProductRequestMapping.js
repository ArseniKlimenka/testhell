'use strict';

module.exports = function insuranceProductRequestMapping(input) {

    const selectedProduct = input.data?.product?.productCode;
    const selectedProductGroup = input.data?.productGroup;
    const searchCriteria = {};

    if (selectedProduct && !input.searchText) {

        searchCriteria.code = selectedProduct;
    }
    else if (input.searchText) {

        searchCriteria.description = input.searchText;
    }

    if (selectedProductGroup) {

        searchCriteria.productGroup = selectedProductGroup;
    }

    return {
        data: {
            criteria: searchCriteria
        },
        paging: {
            pageSize: 15,
            page: 0
        }
    };
};
