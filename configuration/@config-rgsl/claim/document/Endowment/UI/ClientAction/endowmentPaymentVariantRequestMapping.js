'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function endowmentPaymentVariantRequestMapping(input) {

    const endowmentPaymentVariant = input.data.endowmentPaymentVariant;

    const result = basicCtDropdownRequestMapping(endowmentPaymentVariant, input.searchText);
    result.paging = {
        pageSize: 30,
        page: 0
    };

    return result;
};
