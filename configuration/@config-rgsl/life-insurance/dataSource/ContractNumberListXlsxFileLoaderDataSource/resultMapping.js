'use strict';

module.exports = function resultMapping(input) {

    const data = {
        excelRowNumber: input.$rowNumber.toString(),
        contractNumber: input.contractNumber
    };

    const ret = {
        data: data,
        $recordKey: `${input.$rowNumber}`
    };

    return ret;
};
