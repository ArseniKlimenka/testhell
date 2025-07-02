'use strict';

module.exports = function getPoLinkNameText(input) {

    const existingPaymentOrders = input.context.ClientViewModel.existingPaymentOrders;

    if (existingPaymentOrders) {

        const existing = existingPaymentOrders.find(item => item.paymentOrderNumber === input.data.assignedPaymentOrderNumber);

        if (existing) {

            return existing.paymentOrderNumber;
        }
    }
};
