const { newGuid, replaceNullWithUndefined, removeExtraSymbols, convertStringDateFormat, exctactNameFromString } = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function resultMapping(input) {
    input = replaceNullWithUndefined(input);

    // temporary solution, wait for LJADIRD-34847
    // 1. paymentAmount we can set as string in configuration because we use parseFloat in mapping
    // 2. just validation on empty smallPaymentNumber, but it will work only in current XLSX file footer format
    if (!input.smallPaymentNumber) { return; }

    const ret = {
        smallPaymentNumber: removeExtraSymbols(input.smallPaymentNumber),
        paymentDate: input.paymentDate,
        payerFullName: input.payerFullName,
        paymentDescription: removeExtraSymbols(input.paymentDescription),
        paymentAmount: parseFloat(input.paymentAmount),
        allocationAmount: parseFloat(input.paymentAmount),
    };

    return {
        data: ret,
        $recordKey: newGuid()
    };

};
