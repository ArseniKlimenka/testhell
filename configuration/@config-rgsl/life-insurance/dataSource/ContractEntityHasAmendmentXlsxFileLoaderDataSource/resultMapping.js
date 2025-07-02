'use strict';

const helper = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');

module.exports = function resultMapping(input) {

    input = helper.replaceNullWithUndefined(input);

    const hasAmendment = helper.readyForDatabaseHasAmendment(input);

    const data = {
        excelRowNumber: input.$rowNumber,
        contractNumber: input.contractNumber,
        hasAmendment: hasAmendment
    };

    return {
        data: data,
        $recordKey: helper.newGuid(),
    };
};
