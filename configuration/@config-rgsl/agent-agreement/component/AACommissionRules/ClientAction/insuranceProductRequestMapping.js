'use strict';

module.exports = function insuranceProductRequestMapping(input) {

    const selectedProducts = input.data.commissionRules?.insuranceProduct?.values ?? [];
    const searchCriteria = {};

    if (selectedProducts.length > 0 && !input.searchText) {

        searchCriteria.codes = selectedProducts.map(p => p.code);
    }
    else if (input.searchText) {

        searchCriteria.searchText = input.searchText;
    }

    return {
        data: {
            criteria: searchCriteria
        }
    };
};
