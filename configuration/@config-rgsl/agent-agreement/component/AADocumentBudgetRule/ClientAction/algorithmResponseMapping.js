'use strict';

const { basicCtDropdownResponseMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function algorithmResponseMapping(input) {

    const result = basicCtDropdownResponseMapping(input);
    return result;
};
