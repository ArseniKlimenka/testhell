const { newGuid, replaceNullWithUndefined, removeExtraSymbols, convertStringDateFormat, exctactNameFromString } = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function resultMapping(input) {
    input = replaceNullWithUndefined(input);

    // temporary solution, wait for LJADIRD-34847
    // 1. paymentAmount we can set as string in configuration because we use parseFloat in mapping
    // 2. just validation on empty paymentAmount, but it will work only in current XLSX file footer format
    if (!input.paymentAmount) { return; }

    const contractStr = removeExtraSymbols(input.paymentDescription);

    let paymentDate = convertStringDateFormat(input.paymentDate);
    try {
        DateTimeUtils.formatDate(paymentDate); // just for error if input data format is not dd-mm-yyyy
    } catch (error) {
        paymentDate = input.paymentDate;
    }

    const ret = {
        smallPaymentNumber: removeExtraSymbols(input.smallPaymentNumber),
        paymentDate: paymentDate,
        payerFullName: exctactNameFromString(contractStr),
        paymentDescription: input.paymentDescription,
        paymentAmount: parseFloat(input.paymentAmount),
        allocationAmount: parseFloat(input.paymentAmount),
    };

    return {
        data: ret,
        $recordKey: newGuid()
    };

};
