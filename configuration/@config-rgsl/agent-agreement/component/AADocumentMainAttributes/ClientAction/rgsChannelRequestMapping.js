'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function rgsChannelRequestMapping(input) {

    const rgsChannel = input.componentContext.rgsChannel;

    const result = basicCtDropdownRequestMapping(rgsChannel, input.searchText);
    return result;
};
