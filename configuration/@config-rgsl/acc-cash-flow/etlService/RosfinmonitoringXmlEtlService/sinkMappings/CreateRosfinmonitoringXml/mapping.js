'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const bsiIds = sinkInput.resultData?.map(bsi => bsi.bankStatementItemId) ?? [];

    if (bsiIds.length == 0) {
        return;
    }

    const IsAllocatedItems = sinkInput.resultData?.some(bsi => bsi.allocationPayAmountSum > 0) ?? false;

    return {
        request: {
            IsAllocatedItems,
            BankStatementItemIds: bsiIds,
            SkipValidations: true
        }
    };

};
