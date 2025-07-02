'use strict';

const { paymentOrderSubType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function getPitPoLinkNameText(input) {

    const existingPaymentOrders = input.context.ClientViewModel.existingPaymentOrders;

    if (existingPaymentOrders) {

        const existing = existingPaymentOrders.find(item => item.paymentOrderNumber === input.data.assignedPitPaymentOrderNumber && item.paymentOrderSubType === paymentOrderSubType.PIT);

        if (existing) {

            return existing.paymentOrderNumber;
        }
    }
};
