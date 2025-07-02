module.exports = function mapping(sinkInput, sinkExchange) {

    const bsiIds = sinkExchange.createdBankStatementItems;

    if (bsiIds.length === 0) {
        return;
    }

    return {
        request: {
            bankStatementItemIds: bsiIds,
        }
    };
};
