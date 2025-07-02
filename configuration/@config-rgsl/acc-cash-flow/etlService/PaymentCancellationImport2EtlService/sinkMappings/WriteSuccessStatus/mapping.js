module.exports = function mapping(input, sinkExchange) {
    const paymentCancellationId = this.businessContext.etlServiceInput.paymentCancellationId.toLowerCase();

    const sat = {
        IMPORT_DOCUMENT_ID: paymentCancellationId,
        BANK_STATEMENT_ITEM_ID: input.bankStatementItemId,
        RECORD_KEY: input.recordKey,
    };

    return {
        'ACC_IMPL.PAYMENT_CANCELLATION_ITEM_SAT': [sat],
    };
};
