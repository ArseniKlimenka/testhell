'use strict';

module.exports = function resultMapping(sinkInput, sinkExchange) {

    const createdPaymentOrders = sinkExchange.createdPaymentOrders;

    return {
        paymentOrders: createdPaymentOrders,
        amendmentConfName: sinkExchange?.contractData?.amendmentConfName
    };
};
