const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function mapping(sinkInput, sinkExchange) {
    const importedItems = sinkExchange.resolveContext("importedItems");
    const totalPaymentAmount = importedItems.reduce((a, i) => round(a + i.data.paymentAmount, 2), 0);
    const totalAllocationAmount = importedItems.reduce((a, i) => round(a + i.data.allocationAmount, 2), 0);
    sinkInput.body.summary = {
        numberOfRowsImported: importedItems.length,
        totalPaymentAmount: totalPaymentAmount,
        totalAllocationAmount: totalAllocationAmount,
    };

    return {
        body: sinkInput.body,
        number: sinkInput.number,
    };
};
