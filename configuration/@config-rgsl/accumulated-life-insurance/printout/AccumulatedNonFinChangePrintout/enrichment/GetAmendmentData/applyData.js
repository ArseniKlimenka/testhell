"use strict";

const printoutUtils = require('@config-rgsl/acc-payment-order/lib/printoutHelper');

module.exports = function mapping(input, dataSourceResponse) {

    if (dataSourceResponse.data && dataSourceResponse.data.length > 0) {

        const record = dataSourceResponse.data[0].resultData;
        input.contractNumber = record.contractNumber;
        input.contractIssueDate = record.issueDate ? printoutUtils.formatDatePrint(record.issueDate) : undefined;
    }
};
