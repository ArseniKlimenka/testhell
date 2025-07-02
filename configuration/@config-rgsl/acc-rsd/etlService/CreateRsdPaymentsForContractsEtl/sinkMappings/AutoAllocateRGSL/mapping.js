module.exports = function mapping(sinkInput, sinkExchange) {
    const bsiIds = sinkExchange.resolveContext('createdBankStatementItems');
    if (!bsiIds) {
        return;
    }

    return {
        request: {
            bankStatementItemIds: bsiIds,
        }
    };
};
