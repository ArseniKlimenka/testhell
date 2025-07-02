'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function salesChannelRequestMapping(input) {

    const salesChannel = input.data.salesChannel;

    const result = basicCtDropdownRequestMapping(salesChannel, input.searchText);
    return result;
};
