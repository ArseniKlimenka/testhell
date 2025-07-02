'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function paymentOrderUriMapping(input) {

    const paymentOrderNumber = input.data?.paymentOrderNumber;

    if (paymentOrderNumber) {

        return uriBuilder.getPaymentOrderUri(paymentOrderNumber);
    }
};
