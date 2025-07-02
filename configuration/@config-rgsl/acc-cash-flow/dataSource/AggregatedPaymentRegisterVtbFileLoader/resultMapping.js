const { newGuid, replaceNullWithUndefined, convertExcelDateToStringDateFormat } = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');

module.exports = function resultMapping(input) {
    input = replaceNullWithUndefined(input);

    const ret = {
        smallPaymentNumber: input.smallPaymentNumber,
        paymentDate: convertExcelDateToStringDateFormat(input.paymentDate),
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
