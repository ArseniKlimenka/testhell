'use strict';

module.exports = function riskRequestMapping(input) {

    const searchText = input.searchText;
    const currentValue = input.request?.data?.criteria?.riskCode;

    const searchCriteria = {};
    searchCriteria.code = undefined;
    searchCriteria.description = undefined;

    if (currentValue && !searchText) {

        searchCriteria.code = currentValue.code;
    }
    else if (searchText) {

        searchCriteria.riskShortDescription = searchText;
    }

    return {
        data: {
            criteria: searchCriteria,
            paging: {
                pageSize: 30,
                page: 0
            }
        }
    };
};
