'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function endowmentPaymentFrequencyRequestMapping(input) {

    const endowmentPaymentFrequency = input.data.endowmentPaymentFrequency;

    const result = basicCtDropdownRequestMapping(endowmentPaymentFrequency, input.searchText);
    result.paging = {
        pageSize: 30,
        page: 0
    };

    return result;
};
