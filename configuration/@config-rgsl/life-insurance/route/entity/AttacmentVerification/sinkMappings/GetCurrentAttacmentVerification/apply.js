module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    if (sinkResult?.data?.length > 0) {
        sinkExchange.verificationAlreadyCreated = true;
    } else {
        sinkExchange.verificationAlreadyCreated = false;
    }
};
