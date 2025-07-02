'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function inquiryReasonRequestMapping(input) {

    const inquiryReasons = input.data.inquiryReasons;

    const result = basicCtDropdownRequestMapping(inquiryReasons, input.searchText);
    result.paging = {
        pageSize: 30,
        page: 0
    };

    return result;
};
