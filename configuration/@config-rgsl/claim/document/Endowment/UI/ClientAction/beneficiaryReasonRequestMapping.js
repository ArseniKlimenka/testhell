'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function beneficiaryReasonRequestMapping(input) {

    const beneficiaryReason = input.data.beneficiaryReason;

    const result = basicCtDropdownRequestMapping(beneficiaryReason, input.searchText);
    result.paging = {
        pageSize: 30,
        page: 0
    };

    return result;
};
