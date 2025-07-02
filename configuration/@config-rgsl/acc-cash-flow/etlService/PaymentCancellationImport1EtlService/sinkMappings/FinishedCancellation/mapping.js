module.exports = function mapping(lineInput, sinkExchange, additionalDataSourcesResults) {

    if (!this.businessContext.etlServiceInput.onlyAllocation) {
        return;
    }

    const cancellationDocuments = additionalDataSourcesResults.GetPaymentCancellationDataSource.data;

    if (cancellationDocuments?.length !== 1) {
        throw 'PaymentCancellation data was not found: ' + cancellationDocuments?.length;
    }

    const cancellationDocument = cancellationDocuments[0].resultData;

    const result = {
        businessNumber: cancellationDocument.paymentCancellationNumber,
        transition: {
            transitionName: 'FinishCancelAllocation',
            configurationName: 'PaymentCancellationImport',
            configurationVersion: '1',
        },
    };
    return result;
};
