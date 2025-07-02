const { newGuid, replaceNullWithUndefined, convertStringDateFormat } = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');

module.exports = function resultMapping(input) {
    input = replaceNullWithUndefined(input);

    // temporary solution, wait for LJADIRD-34847
    // 1. paymentAmount we can set as string in configuration because we use parseFloat in mapping
    // 2. just validation on empty paymentAmount, but it will work only in current XLSX file footer format
    if (!input.paymentAmount) { return; }

    const ret = {
        smallPaymentNumber: input.smallPaymentNumber,
        paymentDate: convertStringDateFormat(input.paymentDate),
        payerFullName: input.payerFullName,
        paymentDescription: input.paymentDescription,
        paymentAmount: parseFloat(input.paymentAmount),
        allocationAmount: parseFloat(input.paymentAmount),
    };

    return {
        data: ret,
        $recordKey: newGuid()
    };

};
