'use strict';

module.exports = function apply(sinkResult, lineInput, sinkExchange) {

    const id = sinkExchange.additionalData.allocationId;
    const allocations = sinkResult.data.map(_ => _.resultData);
    const allocation = allocations.find((x) => id === x.allocationId);
    const allocationsSum = allocations.reduce((partialSum, x) => partialSum + x.payAmount, 0);

    if (!allocation) {

        return undefined;
    }

    sinkExchange.allocationInfo = `Очередной платеж в размере ${allocation?.payAmount} ${allocation?.payCurrencyCode}`;
    sinkExchange.allContractAllocationsSum = `${allocationsSum} ${allocation?.payCurrencyCode}`;
    sinkExchange.transactionDate = allocation.bsi.transactionDate;
    sinkExchange.payerName = allocation.bsi.payerName;
    sinkExchange.paymentSourceId = allocation.bsi.paymentSourceId;
    sinkExchange.bsiId = allocation.bsiId;
};
