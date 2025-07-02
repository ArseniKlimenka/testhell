'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { paymentOrderSubType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function poNumberUriMapping(input) {

    const existingPaymentOrders = input.context.ClientViewModel.existingPaymentOrders;

    if (existingPaymentOrders) {

        const existing = existingPaymentOrders.find(item => item.paymentOrderNumber === input.data.assignedPaymentOrderNumber &&
            item.paymentOrderSubType === paymentOrderSubType.Endowment);

        if (existing) {

            return uriBuilder.getPaymentOrderUri(existing.paymentOrderNumber);
        }
    }
};
