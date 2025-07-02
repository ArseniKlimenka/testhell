module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const parties = sinkResult.data.map(x => x.resultData);

    sinkExchange.partyCode = parties.length > 0 ? parties[0].code : undefined;
};
