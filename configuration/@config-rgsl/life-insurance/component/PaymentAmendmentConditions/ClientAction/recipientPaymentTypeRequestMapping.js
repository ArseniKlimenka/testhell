'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function recipientPaymentTypeRequestMapping(input) {

    const result = basicCtDropdownRequestMapping(amendmentConstants.availableCancellationRecipientPaymentType, input.searchText);
    result.paging = {
        pageSize: 30,
        page: 0
    };

    return result;
};
