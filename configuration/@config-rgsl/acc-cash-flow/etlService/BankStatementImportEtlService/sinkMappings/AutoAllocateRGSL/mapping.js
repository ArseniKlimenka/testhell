module.exports = function mapping(sinkInput, sinkExchange) {
    const bsiIds = sinkExchange.resolveContext("createdBankStatementItems");

    return {
        request: {
            BankStatementItemIds: bsiIds
        }
    };
};
