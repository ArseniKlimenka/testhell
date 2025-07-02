module.exports = function mapping(input, sinkExchange) {

    return {
        request: {
            bankStatementItemIds: [input.bankStatementItemId],
        }
    };
};
