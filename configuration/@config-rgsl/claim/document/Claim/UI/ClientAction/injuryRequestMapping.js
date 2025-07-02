'use strict';

module.exports = function injuryRequestMapping(input) {

    const injuryDetails = input.data?.injuryDetails;

    const result = requestMapping(injuryDetails, input.searchText);

    result.paging = {
        pageSize: 30,
        page: 0
    };

    return result;
};

function requestMapping(currentValue, searchText) {

    const searchCriteria = {};
    searchCriteria.description = {};

    if (searchText || currentValue?.description) {

        searchCriteria.description.description = searchText ?? currentValue.description;
    }

    return {
        data: {
            criteria: searchCriteria
        }
    };
}
