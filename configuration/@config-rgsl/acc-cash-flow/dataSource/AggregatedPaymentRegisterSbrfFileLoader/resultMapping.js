const { newGuid, replaceNullWithUndefined, convertStringDateFormat } = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');

module.exports = function resultMapping(input) {
    input = replaceNullWithUndefined(input);

    const ret = {
        smallPaymentNumber: input.smallPaymentNumber,
        paymentDate: convertStringDateFormat(input.paymentDate),
        payerFullName: input.payerFullName,
        paymentDescription: input.paymentDescription,
        paymentAmount: parseFloat(input.paymentAmount.replace(',', '.')),
    };

    ret.allocationAmount = ret.paymentAmount;

    return {
        data: ret,
        $recordKey: newGuid()
    };

};
