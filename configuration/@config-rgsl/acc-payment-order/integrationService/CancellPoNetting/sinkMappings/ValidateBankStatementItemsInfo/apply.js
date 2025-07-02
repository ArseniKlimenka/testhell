'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const bankStatementItemIds = sinkExchange.bankStatementItemIds;

    bankStatementItemIds.forEach(item => {

        const itemInfo = sinkResult.data.find(d => d.resultData.bankStatementItemId === item);

        if (!itemInfo) {

            throw `Unable to find bsi data for bsi with ID: ${item.bankStatementItemId}`;
        }

        if (itemInfo.amount !== itemInfo.openAmount) {

            throw `Open amount is not equal to amount for bsi with ID: ${item.bankStatementItemId}`;
        }
    });
};
