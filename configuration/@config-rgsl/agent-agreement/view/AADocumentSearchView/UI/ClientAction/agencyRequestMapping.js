'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function agencyRequestMapping(input) {

    const agency = input.data.agency;

    const result = basicCtDropdownRequestMapping(agency, input.searchText);

    return result;
};
