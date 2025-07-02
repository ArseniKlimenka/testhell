"use strict";

const { paymentOrderType, paymentOrderSubType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function mapping(input, sinkExchange) {

    const type = input.paymentOrderType;
    const subType = input.paymentOrderSubtype;
    const shouldUpdate = input.shoudlUpdateRefDoc;
    const isCollectiveClaim = type === paymentOrderType.Claim && subType === paymentOrderSubType.Collective;

    if (!isCollectiveClaim || !shouldUpdate) {

        return;
    }

    const claimBody = sinkExchange.resolveContext('claimBody');
    const claimNumber = sinkExchange.resolveContext('claimNumber');

    const poNumber = sinkExchange.createdPaymentOrders
        .find(item => item.paymentOrderType === paymentOrderType.Claim && item.paymentOrderSubtype === paymentOrderSubType.Collective).paymentOrderNumber;
    claimBody.claimAmounts.assignedPaymentOrderNumber = poNumber;

    return {
        body: claimBody,
        number: claimNumber
    };
};
