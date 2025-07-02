module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    sinkExchange.mapContext("createdBankStatementItems", sinkResult.createdBankStatementItems);
};
