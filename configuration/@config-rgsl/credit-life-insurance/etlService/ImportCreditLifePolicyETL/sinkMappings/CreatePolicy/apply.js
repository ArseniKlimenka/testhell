module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.createdPolicyId = sinkResult.id;
    sinkExchange.createdPolicyNumber = sinkResult.documentNumber;

};
