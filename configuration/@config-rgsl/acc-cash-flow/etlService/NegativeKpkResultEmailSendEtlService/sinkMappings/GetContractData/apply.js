module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult?.data?.length === 0) {

        return;
    }

    const contractRecord = sinkResult.data[0].resultData;

    sinkExchange.issueDate = contractRecord.issueDate;
    sinkExchange.productCode = contractRecord.productCode;
};
