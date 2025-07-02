'use strict';
const { endowmentPaymentLineType } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function enablePaymentLineSum(input) {

    return input.data.lineType !== endowmentPaymentLineType.PIT;
};
