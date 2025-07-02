'use strict';

module.exports = function mapping(input, sinkExchange) {

    const allocations = sinkExchange.resolveContext('allocations');
    const paymentOrderRequests = [];

    allocations.forEach(element => {
        const request = {
            paymentOrderType: 'PaymentRefund',
            referenceNumber: element.bsiId.toString(),
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
