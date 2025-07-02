'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function lineProductsRequestMapping(input) {
    const selectedProducts = getValue(input, 'data.lineProducts');
    const selectedProductGroup = getValue(input, 'data.lineProductGroup');
    const searchCriteria = {};

    if (selectedProducts && selectedProducts.length > 0 && !input.searchText) {
        searchCriteria.codes = selectedProducts;
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
        }
    };
};
