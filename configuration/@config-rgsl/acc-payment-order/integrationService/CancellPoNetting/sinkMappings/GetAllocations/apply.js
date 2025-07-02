'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const bankStatementItemIds = sinkExchange.bankStatementItemIds;
    const paymentData = [];

    bankStatementItemIds.forEach(item => {

        const allocations = sinkResult.data.filter(d => d.resultData.bsiId === item).map(d => d.resultData) ?? [];

        const convertedItem = {

            itemId: item,
            allocationsInfo: allocations
        };

        paymentData.push(convertedItem);
    });

    sinkExchange.paymentData = paymentData;
};
