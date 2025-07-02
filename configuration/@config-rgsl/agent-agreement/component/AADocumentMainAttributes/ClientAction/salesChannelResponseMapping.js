'use strict';

const { basicCtDropdownResponseMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function salesChannelResponseMapping(input) {

    const result = basicCtDropdownResponseMapping(input);
    return result;
};
