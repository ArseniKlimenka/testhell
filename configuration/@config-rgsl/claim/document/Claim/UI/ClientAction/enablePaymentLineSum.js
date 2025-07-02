'use strict';
const { claimPaymentLineType } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function enablePaymentLineSum(input) {

    return input.data.lineType !== claimPaymentLineType.invProfitSlp;
};
