'use strict';

const { paymentOrderStates } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function enableNettingCancelling(input, ambientProperties) {

    const totalNettingAmount = input.rootContext.Body?.paymentOrderNetting?.totalNettingAmount ?? 0;
    return input.rootContext?.State?.Code === paymentOrderStates.Paid &&
    totalNettingAmount > 0 &&
    ambientProperties.applicationContext.currentUser().getUserName() === 'Administrator';
};
