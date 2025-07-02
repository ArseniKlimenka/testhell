'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function diseaseClassRequestMapping(input) {

    const diagnosis = input.data.diagnosis;

    const result = basicCtDropdownRequestMapping(diagnosis, input.searchText);
    result.paging = {
        pageSize: 30,
        page: 0
    };

    return result;
};
