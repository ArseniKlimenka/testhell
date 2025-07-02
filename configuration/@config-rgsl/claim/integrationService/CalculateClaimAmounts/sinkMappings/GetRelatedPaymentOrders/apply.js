'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult?.data?.length > 0) {

        const activePaymentOrders = sinkResult.data
            .filter(item => item.resultData.originalStateCode !== 'Cancelled' && item.resultData.recipient.code);

        sinkExchange.foundPaymentOrders = activePaymentOrders.map(item => {

            return {
                paymentOrderNumber: item.metadata.code,
                beneficiaryCode: item.resultData.recipient.code,
                paymentOrderType: item.resultData.paymentOrderType,
                paymentOrderSubType: item.resultData.paymentOrderSubType
            };
        });
    }
};
