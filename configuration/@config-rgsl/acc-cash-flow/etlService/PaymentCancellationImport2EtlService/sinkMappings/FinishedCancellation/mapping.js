module.exports = function mapping(lineInput, sinkExchange, additionalDataSourcesResults) {

    const failedCount = sinkExchange.resolveContext('failedCount');

    const cancellationDocuments = additionalDataSourcesResults.GetPaymentCancellationDataSource.data;
    if (cancellationDocuments?.length !== 1) {
        throw 'PaymentCancellation data was not found: ' + cancellationDocuments?.length;
    }

    const cancellationDocument = cancellationDocuments[0].resultData;

    const result = {
        businessNumber: cancellationDocument.paymentCancellationNumber,
        transition: {
            transitionName: failedCount === 0 ? 'FinishDocument' : 'FinishCancelPayment',
            configurationName: 'PaymentCancellationImport',
            configurationVersion: '1',
        },
    };

    return result;
};
