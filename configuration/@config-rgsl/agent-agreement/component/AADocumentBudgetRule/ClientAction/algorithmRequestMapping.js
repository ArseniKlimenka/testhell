'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function algorithmRequestMapping(input) {

    const salesChannel = input.componentContext.algorithm;

    const result = basicCtDropdownRequestMapping(salesChannel, input.searchText);
    return result;
};
