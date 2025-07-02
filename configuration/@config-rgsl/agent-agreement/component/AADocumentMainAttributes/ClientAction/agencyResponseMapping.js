'use strict';

const { basicCtDropdownResponseMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function agencyResponseMapping(input) {

    const result = basicCtDropdownResponseMapping(input);
    return result;
};
