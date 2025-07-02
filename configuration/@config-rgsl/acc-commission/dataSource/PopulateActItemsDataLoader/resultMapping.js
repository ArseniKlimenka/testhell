const { replaceNullWithUndefined, convertExcelDateToStringDateFormat } = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');

module.exports = function resultMapping(input) {
    input = replaceNullWithUndefined(input);

    const ret = {
        aaExternalNumber: input.aaExternalNumber,
        agentName: input.agentName,
        contractNumber: input.contractNumber,
        dueDate: convertExcelDateToStringDateFormat(input.dueDate),
        commAmount: parseFloat(input.commAmount),
    };

    return ret;
};
