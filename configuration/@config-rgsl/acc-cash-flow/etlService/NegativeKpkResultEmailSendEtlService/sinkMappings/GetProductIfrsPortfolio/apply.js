module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult?.data?.length === 0) {

        return;
    }

    const record = sinkResult.data[0].resultData;

    sinkExchange.ifrsPortfolio = record.ifrsPortfolio;
};
