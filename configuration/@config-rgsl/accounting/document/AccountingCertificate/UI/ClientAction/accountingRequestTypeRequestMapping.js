'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function accountingRequestTypeRequestMapping(input) {

    const typeOfRequest = input.data.typeOfRequest;

    const result = basicCtDropdownRequestMapping(typeOfRequest, input.searchText);
    return result;
};
