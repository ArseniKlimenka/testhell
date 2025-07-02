'use strict';

const helper = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');

module.exports = function resultMapping(input) {

    input = helper.replaceNullWithUndefined(input);

    helper.readyForDatabaseOriginalReceiptDate(input);

    const data = {
        excelRowNumber: input.$rowNumber,
        contractNumber: input.contractNumber,
        originalReceiptDate: input.originalReceiptDate
    };

    return {
        data: data,
        $recordKey: helper.newGuid(),
    };
};
