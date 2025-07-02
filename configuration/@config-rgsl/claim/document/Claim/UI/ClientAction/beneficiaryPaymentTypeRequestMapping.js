'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function beneficiaryPaymentTypeRequestMapping(input) {

    const beneficiaryPaymentType = input.data.beneficiaryPaymentType;

    const result = basicCtDropdownRequestMapping(beneficiaryPaymentType, input.searchText);
    result.paging = {
        pageSize: 30,
        page: 0
    };

    return result;
};
