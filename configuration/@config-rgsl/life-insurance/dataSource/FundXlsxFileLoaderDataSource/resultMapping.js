'use strict';

const {
    newGuid,
    replaceNullWithUndefined,
    readyForDatabaseString,
    readyForDatabaseInt,
    readyForDatabaseFloat,
} = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');

const {
    stringAttributesArr,
    intAttributesArr,
    floatAttributesArr,
} = require('@config-rgsl/life-insurance/lib/fundHelper');

module.exports = function resultMapping(input) {

    if (!this.businessContext.contractNumbers) {
        this.businessContext.contractNumbers = [];
    }

    if (this.businessContext.contractNumbers.includes(input.documentNumber)) {
        throw new Error(`E: В файле не должно содержаться более одной строки для одного договора.
            Номер строки Excel: ${input.$rowNumber}. Номер договора ${input.documentNumber}.`);
    }

    this.businessContext.contractNumbers.push(input.documentNumber);

    input = replaceNullWithUndefined(input);

    readyForDatabaseString(input, stringAttributesArr, this, true);
    readyForDatabaseInt(input, intAttributesArr, this);
    readyForDatabaseFloat(input, floatAttributesArr, this);

    const reportDate = this.businessContext.data.reportDate;

    const data = {
        excelRowNumber: input.$rowNumber,
        rowNumber: input.rowNumber,
        documentNumber: input.documentNumber,
        fundStatus: input.fundStatus,
        netAssetsAmount: input.netAssetsAmount,
        freeMoney: input.freeMoney,
        numberOfUnits: input.numberOfUnits,
        unitCurrentAmount: input.unitCurrentAmount,
        reportDate: reportDate,
    };

    return {
        data: data,
        $recordKey: newGuid(),
    };
};
