module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    if (sinkResult.data.length === 0) {
        this.stopExecution('PartnerIsAbsent');
        return;
    }
};
