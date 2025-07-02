'use strict';

const helper = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');

module.exports = function resultMapping(input) {

    input = helper.replaceNullWithUndefined(input);

    const hasPaymentIntermediateApplication = helper.readyForDatabaseHasPaymentIntermediateApplication(input);
    const paymentIntermediateApplicationDate = helper.readyForDatabasePaymentIntermediateApplicationDate(input);

    const data = {
        excelRowNumber: input.$rowNumber,
        contractNumber: input.contractNumber,
        hasPaymentIntermediateApplication: hasPaymentIntermediateApplication,
        paymentIntermediateApplicationDate: paymentIntermediateApplicationDate
    };

    return {
        data: data,
        $recordKey: helper.newGuid(),
    };
};
