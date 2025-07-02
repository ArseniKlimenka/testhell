'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function accountingContractTypeRequestMapping(input) {

    const contractTypeCode = input.data.type;

    const result = basicCtDropdownRequestMapping(contractTypeCode, input.searchText);
    return result;

};
