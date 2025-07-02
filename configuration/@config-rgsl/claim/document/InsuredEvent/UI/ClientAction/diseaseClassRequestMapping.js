'use strict';

module.exports = function diseaseClassRequestMapping(input) {

    const diagnosis = input.data.diagnosis;

    const result = requestMapping(diagnosis, input.searchText);

    result.paging = {
        pageSize: 30,
        page: 0
    };

    return result;
};

function requestMapping(currentValue, searchText) {

    const searchCriteria = {};
    searchCriteria.code = undefined;
    searchCriteria.description = undefined;

    if (currentValue && !searchText) {

        searchCriteria.code = currentValue.code;
    }
    else if (searchText) {

        searchCriteria.description = searchText;
        searchCriteria.fullText = true;
    }

    return {
        data: {
            criteria: searchCriteria
        }
    };
}
