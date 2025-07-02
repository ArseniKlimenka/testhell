module.exports = function mapping(input, sinkExchange) {

    const importedItems = sinkExchange.resolveContext('items');
    const allocations = sinkExchange.resolveContext('allocations');

    const hab = importedItems.map(item => ({
        IMPORT_DOCUMENT_ID: item.importDocumentId.toLowerCase(),
        BANK_STATEMENT_ITEM_ID: item.data.bankStatementItemId,
    }));

    const sat = importedItems.map(item => ({
        IMPORT_DOCUMENT_ID: item.importDocumentId.toLowerCase(),
        BANK_STATEMENT_ITEM_ID: item.data.bankStatementItemId,
        RECORD_KEY: item.recordKey,
    }));

    const assAllocation = allocations.map(allocation => {
        const item = importedItems.find(_ => _.data.bankStatementItemId === allocation.bsiId);
        return {
            IMPORT_DOCUMENT_ID: item.importDocumentId.toLowerCase(),
            BANK_STATEMENT_ITEM_ID: item.data.bankStatementItemId,
            ALLOCATION_ID: allocation.allocationId,
        };
    });

    return {
        'ACC_IMPL.PAYMENT_CANCELLATION_ITEM_HUB': hab,
        'ACC_IMPL.PAYMENT_CANCELLATION_ITEM_SAT': sat,
        'ACC_IMPL.PAYMENT_CANCELLATION_ALLOCATION_LINK': assAllocation,
    };
};
