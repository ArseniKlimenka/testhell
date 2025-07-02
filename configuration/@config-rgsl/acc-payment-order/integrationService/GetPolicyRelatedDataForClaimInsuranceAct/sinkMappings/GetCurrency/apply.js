
module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    const result = sinkResult?.data ?? [];
    sinkExchange.currencyList = result.map(item => item.resultData);
};
