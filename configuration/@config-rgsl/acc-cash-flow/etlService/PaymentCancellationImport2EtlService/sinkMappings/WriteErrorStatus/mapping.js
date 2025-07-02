const { ZonedDateTime, ZoneOffset } = require('@js-joda/core');

module.exports = function mapping(errorLineInput, sinkExchange) {
    const paymentCancellationId = this.businessContext.etlServiceInput.paymentCancellationId.toLowerCase();

    const sat = {
        IMPORT_DOCUMENT_ID: paymentCancellationId,
    };

    const { message, input } = errorLineInput;

    if (errorLineInput.dataSource) {
        const { rawData } = errorLineInput.dataSource;
        sat.BANK_STATEMENT_ITEM_ID = rawData.BANK_STATEMENT_ITEM_ID;
        sat.RECORD_KEY = rawData.RECORD_KEY;
        sat.sat.ERROR_MESSAGE = message;
    } else if (errorLineInput.sink) {
        sat.BANK_STATEMENT_ITEM_ID = input.bankStatementItemId,
        sat.RECORD_KEY = input.recordKey,
        sat.ERROR_MESSAGE = errorLineInput.businessErrors != undefined && errorLineInput.businessErrors.length > 0 ? errorLineInput.businessErrors[0].message : errorLineInput.message;
    }

    return {
        'ACC_IMPL.PAYMENT_CANCELLATION_ITEM_SAT': [sat],
    };
};
