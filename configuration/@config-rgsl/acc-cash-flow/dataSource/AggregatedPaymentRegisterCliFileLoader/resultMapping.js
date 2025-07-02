const { newGuid, replaceNullWithUndefined, isValidString, convertStringDateFormat } = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');

module.exports = function resultMapping(input) {
    input = replaceNullWithUndefined(input);

    // temporary solution, wait for LJADIRD-33896
    // 1. paymentAmount we can set as string in configuration because we use parseFloat in mapping
    // 2. just validation on empty paymentAmount, but it will work only in current csv file footer format
    if (!input.paymentAmount) { return; }

    if (!isValidString(input.payerFullName)) {
        throw "Incorrect symbols in string!";
    }

    const ret = {
        smallPaymentNumber: input.smallPaymentNumber,
        paymentDate: convertStringDateFormat(input.paymentDate),
        payerFullName: input.payerFullName,
        paymentDescription: input.paymentDescription,
        contractBeginDate: convertStringDateFormat(input.contractBeginDate),
        paymentAmount: parseFloat(input.paymentAmount),
        allocationAmount: parseFloat(input.paymentAmount),
        payerBirthday: convertStringDateFormat(input.payerBirthday),
        payerEMail: input.payerEMail,
    };

    return {
        data: ret,
        $recordKey: newGuid()
    };

};
