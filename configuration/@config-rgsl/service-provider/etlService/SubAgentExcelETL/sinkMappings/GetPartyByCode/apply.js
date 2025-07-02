module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.party_body = sinkResult.data.resultData.body;

};
