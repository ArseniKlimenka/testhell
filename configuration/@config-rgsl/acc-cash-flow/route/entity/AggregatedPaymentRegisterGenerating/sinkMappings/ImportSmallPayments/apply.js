module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    sinkExchange.createdBankStatementItems = sinkResult.createdBankStatementItems;
};
