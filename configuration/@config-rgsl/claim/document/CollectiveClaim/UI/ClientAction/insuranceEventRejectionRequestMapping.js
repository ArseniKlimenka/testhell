'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function insuranceEventRejectionRequestMapping(input) {

    const rejectionReason = input.data.rejectionReason;

    const result = basicCtDropdownRequestMapping(rejectionReason, input.searchText);
    result.paging = {
        pageSize: 30,
        page: 0
    };

    return result;
};
