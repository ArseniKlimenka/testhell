'use strict';

module.exports = function mapping(input, sinkExchange) {

    const allocations = sinkExchange.resolveContext('allocations');
    const paymentOrderRequests = [];

    allocations.forEach(_ => {
        const request = {
            paymentOrderType: 'PaymentRefund',
            referenceNumber: _.bsiId.toString(),
            shoudlUpdateRefDoc: true
        };
        paymentOrderRequests.push(request);
    });

    return paymentOrderRequests.map(_ => {
        return {
            paymentOrderType: _.paymentOrderType,
            referenceNumber: _.referenceNumber,
            shoudlUpdateRefDoc: _.shoudlUpdateRefDoc
        };
    });

};
