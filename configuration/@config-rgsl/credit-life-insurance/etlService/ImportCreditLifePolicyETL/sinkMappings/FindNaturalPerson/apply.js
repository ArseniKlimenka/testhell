module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.parties = sinkResult.data.map(x => x.resultData);
};
