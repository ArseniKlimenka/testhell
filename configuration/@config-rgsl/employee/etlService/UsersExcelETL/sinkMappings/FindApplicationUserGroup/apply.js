module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.data.length === 0) { return; }

    sinkExchange.UserGroup = sinkResult.data;
};
