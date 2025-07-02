'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    const integrationServiceInput = sinkExchange.integrationServiceInput;

    const createdPaymentOrders = [];

    const paymentOrder = {
        paymentOrderNumber: sinkResult.documentNumber,
        paymentOrderType: integrationServiceInput.paymentOrderType,
        paymentOrderSubtype: integrationServiceInput.paymentOrderSubtype
    };

    createdPaymentOrders.push(paymentOrder);
    sinkExchange.createdPaymentOrders = createdPaymentOrders;
};
