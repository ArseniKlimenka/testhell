module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.partyCode = sinkResult.code;
    sinkExchange.partyId = sinkResult.id;

};
