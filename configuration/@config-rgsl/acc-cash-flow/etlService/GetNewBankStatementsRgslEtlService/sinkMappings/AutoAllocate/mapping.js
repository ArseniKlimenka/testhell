module.exports = function mapping(sinkInput, sinkExchange) {
    const bsiIds = sinkExchange.resolveContext('createdBankStatementItems');

    if (bsiIds && bsiIds.length !== 0) {
        return {
            request: {
                bankStatementItemIds: bsiIds,
            }
        };
    }
};
