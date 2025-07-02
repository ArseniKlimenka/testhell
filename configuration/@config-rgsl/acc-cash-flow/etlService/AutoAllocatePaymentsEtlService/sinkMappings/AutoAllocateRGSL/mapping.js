module.exports = function mapping(sinkInput, sinkExchange) {

    const bsiIds = sinkInput.resultData.map(_ => _.bankStatementItemId);

    return {
        request: {
            BankStatementItemIds: bsiIds
        }
    };

};
