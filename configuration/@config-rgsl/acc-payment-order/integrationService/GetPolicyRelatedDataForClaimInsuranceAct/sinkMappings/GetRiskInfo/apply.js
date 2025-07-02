
module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkResult?.data?.length > 0) {

        const riskRecord = sinkResult.data[0];
        sinkExchange.contractData.riskBusinessLine = riskRecord.resultData.businessLine;
    }
};
