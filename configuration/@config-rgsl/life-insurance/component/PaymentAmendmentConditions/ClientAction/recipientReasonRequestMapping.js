'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function recipientReasonRequestMapping(input) {

    const recipientReason = input.data.recipientReason;

    const result = basicCtDropdownRequestMapping(recipientReason, input.searchText);
    result.paging = {
        pageSize: 30,
        page: 0
    };

    return result;
};
