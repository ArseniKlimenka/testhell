'use strict';
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function enablePaymentSumInRub(input) {

    return input.data.paymentLineType === amendmentConstants.amendmentPaymentLineType.pit;
};
