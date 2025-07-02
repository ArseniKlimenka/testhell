'use strict';

const { basicCtDropdownResponseMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');
const { recipientPaymentType } = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function recipientPaymentTypeResponseMapping(input) {

    let result = basicCtDropdownResponseMapping(input);
    result = result.filter(item => item.value.code === recipientPaymentType.bankAccount || item.value.code === recipientPaymentType.nettingPayment);
    return result;
};
