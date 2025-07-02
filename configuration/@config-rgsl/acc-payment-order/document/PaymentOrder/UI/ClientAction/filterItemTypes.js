'use strict';

const { paymentOrderType,
    paymentOrderSubType,
    manualPaymentLinesForCancellation,
    manualPaymentLinesForCancellationPIT,
    manualPaymentLinesForClaim } = require('@config-rgsl/acc-payment-order/lib/paymentOrderInternalConst');

module.exports = function filterItemTypes(input) {

    let currentItems = input.items;
    const poType = input.rootContext.Body.paymentOrderInformation.paymentOrderType;
    const poSubtype = input.rootContext.Body.paymentOrderInformation.paymentOrderSubType;

    if (poType === paymentOrderType.PolicyCancellation && !poSubtype) {

        currentItems = currentItems.filter(item => manualPaymentLinesForCancellation.includes(item));
    }
    if (poType === paymentOrderType.PolicyCancellation && poSubtype === paymentOrderSubType.CancellationPIT) {

        currentItems = currentItems.filter(item => manualPaymentLinesForCancellationPIT.includes(item));
    }
    else if (poType === paymentOrderType.Claim) {

        currentItems = currentItems.filter(item => manualPaymentLinesForClaim.includes(item));
    }

    return currentItems;
};
