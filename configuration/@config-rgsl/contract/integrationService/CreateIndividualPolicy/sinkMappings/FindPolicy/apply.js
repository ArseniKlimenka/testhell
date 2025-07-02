module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    sinkExchange.mapContext('createdPolicyBody', sinkResult.data[0].resultData.body);
};
