const { replaceNullWithUndefined, convertExcelDateToStringDateFormat } = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');

module.exports = function resultMapping(input) {
    input = replaceNullWithUndefined(input);

    const ret = {
        contractNumber: input.contractNumber,
        dueDate: convertExcelDateToStringDateFormat(input.dueDate),
        rsdAmount: parseFloat(input.rsdAmount),
    };

    return ret;
};
