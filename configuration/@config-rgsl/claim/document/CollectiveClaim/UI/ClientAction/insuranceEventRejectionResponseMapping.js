'use strict';

const { basicCtDropdownResponseMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function insuranceEventRejectionResponseMapping(input) {

    const result = basicCtDropdownResponseMapping(input);
    return result;
};
