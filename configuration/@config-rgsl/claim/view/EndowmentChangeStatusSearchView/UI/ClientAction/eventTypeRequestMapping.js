'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function eventTypeRequestMapping(input) {

    const insuredEventType = input.data.insuredEventType;

    const result = basicCtDropdownRequestMapping(insuredEventType, input.searchText);
    result.paging = {
        pageSize: 30,
        page: 0
    };

    return result;
};
