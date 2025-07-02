module.exports = function mapping(input, sinkExchange) {

    const recordStatus = {
        IMPORT_DOCUMENT_ID: this.businessContext.etlServiceInput.paymentCancellationId.toLowerCase(),
        BANK_STATEMENT_ITEM_ID: input.bsiId,
        ALLOCATION_ID: input.allocationId,
        ERROR_MESSAGE: undefined,
    };

    return {
        'ACC_IMPL.PAYMENT_CANCELLATION_ALLOCATION_SAT': [recordStatus]
    };
};
