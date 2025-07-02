module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult?.data?.length === 0) {

        return;
    }

    const party = sinkResult.data[0].resultData;
    sinkExchange.party = {
        body: party.body,
        code: party.partyCode,
    };
};
