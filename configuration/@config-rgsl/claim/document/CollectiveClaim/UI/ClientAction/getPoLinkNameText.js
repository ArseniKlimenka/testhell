'use strict';

module.exports = function getPoLinkNameText(input) {

    const existingPaymentOrders = input.context.ClientViewModel.existingPaymentOrders;
    const poNumber = input.context.Body.claimAmounts.assignedPaymentOrderNumber;

    if (existingPaymentOrders) {

        const existing = existingPaymentOrders.find(item => item.paymentOrderNumber === poNumber);

        if (existing) {

            return existing.paymentOrderNumber;
        }
    }
};
