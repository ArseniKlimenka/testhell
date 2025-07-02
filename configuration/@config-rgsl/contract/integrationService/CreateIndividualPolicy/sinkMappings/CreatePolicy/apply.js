module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    sinkExchange.mapContext('createdPolicyNumber', sinkResult.documentNumber);
    sinkExchange.mapContext('createdPolicyId', sinkResult.id);
};
