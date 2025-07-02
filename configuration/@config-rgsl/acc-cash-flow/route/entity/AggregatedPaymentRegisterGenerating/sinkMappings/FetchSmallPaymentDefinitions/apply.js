'use strict';
module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    if (sinkResult && sinkResult.data && sinkResult.data.length > 0) {
        sinkExchange.smallPayments = sinkResult.data;
    } else {
        const number = sinkInput.input.data.criteria.aggregatedPaymentNumber;
        sinkExchange.smallPaymentsNotFound = `Small payments for registry ${number} not found.`;
        throw new Error(sinkExchange.smallPaymentsNotFound);
    }
};
