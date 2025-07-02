
'use strict';

const { paymentOrderStates } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function shouldShowNettingPo(input) {

    return input.rootContext?.State?.Code === paymentOrderStates.PaidCancelledNetting;
};
