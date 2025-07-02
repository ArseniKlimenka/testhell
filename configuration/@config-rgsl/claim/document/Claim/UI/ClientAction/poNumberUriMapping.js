'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function poNumberUriMapping(input) {

    const existingPaymentOrders = input.context.ClientViewModel.existingPaymentOrders ?? [];
    const paymentOrder = existingPaymentOrders.find(item => item.paymentOrderNumber === input.data.assignedPaymentOrderNumber);

    if (paymentOrder) {

        return uriBuilder.getPaymentOrderUri(paymentOrder.paymentOrderNumber);
    }
};
