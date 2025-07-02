module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.hasEndowmentRisks = sinkResult.data.length > 0;
};
