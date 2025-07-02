'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');
const { availableEndowmentBeneficiaryPaymentType } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function beneficiaryPaymentTypeRequestMapping(input) {

    const result = basicCtDropdownRequestMapping(availableEndowmentBeneficiaryPaymentType, input.searchText);
    result.paging = {
        pageSize: 30,
        page: 0
    };

    return result;
};
