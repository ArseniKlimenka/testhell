module.exports = function mapping(errorLineInput, sinkExchange) {

    const { input } = errorLineInput;

    const recordStatus = {
        IMPORT_DOCUMENT_ID: this.businessContext.etlServiceInput.paymentCancellationId.toLowerCase(),
        BANK_STATEMENT_ITEM_ID: undefined,
        ALLOCATION_ID: undefined,
        ERROR_MESSAGE: errorLineInput.message,
    };

    if (errorLineInput.dataSource) {
        const { cause, rawData } = errorLineInput.dataSource;

        recordStatus.BANK_STATEMENT_ITEM_ID = rawData.BSI_ID;
        recordStatus.ALLOCATION_ID = rawData.ALLOCATION_ID;
    } else if (errorLineInput.sink) {
        recordStatus.BANK_STATEMENT_ITEM_ID = input.bsiId;
        recordStatus.ALLOCATION_ID = input.allocationId;
    }

    return {
        'ACC_IMPL.PAYMENT_CANCELLATION_ALLOCATION_SAT': [recordStatus]
    };
};
