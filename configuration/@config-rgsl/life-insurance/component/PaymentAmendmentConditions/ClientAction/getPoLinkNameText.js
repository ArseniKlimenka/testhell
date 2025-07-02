'use strict';

const { paymentOrderSubType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function getPoLinkNameText(input) {

    const existingPaymentOrders = input.context.ClientViewModel.existingPaymentOrders;

    if (existingPaymentOrders) {

        const existing = existingPaymentOrders.find(item => item.paymentOrderNumber === input.data.assignedPaymentOrderNumber && !item.paymentOrderSubType);

        if (existing) {

            return existing.paymentOrderNumber;
        }
    }
};
