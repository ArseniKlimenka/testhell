module.exports = function mapping(sinkInput, sinkExchange) {
    const bsiIds = sinkExchange.resolveContext('createdBankStatementItems');

    return bsiIds.map(_ => ({
        request: {
            bankStatementItemId: _,
        }
    }));
};
