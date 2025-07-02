'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { paymentOrderSubType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function pitPoNumberUriMapping(input) {

    const existingPaymentOrders = input.context.ClientViewModel.existingPaymentOrders;

    if (existingPaymentOrders) {

        const existing = existingPaymentOrders.find(item => item.paymentOrderNumber === input.data.assignedPitPaymentOrderNumber &&
            item.paymentOrderSubType === paymentOrderSubType.EndowmentPIT);

        if (existing) {

            return uriBuilder.getPaymentOrderUri(existing.paymentOrderNumber);
        }
    }
};
