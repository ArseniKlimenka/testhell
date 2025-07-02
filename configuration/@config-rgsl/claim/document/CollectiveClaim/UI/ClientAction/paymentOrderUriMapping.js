'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function paymentOrderUriMapping(input) {

    const paymentOrderNumber = input.rootContext.Body.claimAmounts.assignedPaymentOrderNumber;

    if (paymentOrderNumber) {

        return uriBuilder.getPaymentOrderUri(paymentOrderNumber);
    }
};
