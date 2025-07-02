module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    sinkExchange.mapContext('createdPolicyId', sinkResult.id);
    sinkExchange.mapContext('createdPolicyNumber', sinkResult.documentNumber);
};
