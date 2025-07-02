
module.exports = function mapping(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkResult.data && sinkResult.data.length > 0) {

        sinkExchange.realtedEndowments = sinkResult.data;
    }
};
