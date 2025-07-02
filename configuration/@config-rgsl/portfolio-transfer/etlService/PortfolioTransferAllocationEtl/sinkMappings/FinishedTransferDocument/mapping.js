module.exports = function mapping(input, sinkExchange) {

    const failedCount = sinkExchange.resolveContext('failedCount');

    const result = {
        businessNumber: input.portfolioTransferNumber,
        transition: {
            transitionName: failedCount === 0 ? 'TransferProcessing_To_Processed' : 'TransferProcessing_To_ProcessedWithErrors',
        }
    };

    return result;
};
