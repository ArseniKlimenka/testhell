'use strict';

const {
    newGuid,
    replaceNullWithUndefined,
    convertStringDateFormat,
    removeQuotes
} = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');

module.exports = function resultMapping(input) {

    input = replaceNullWithUndefined(input);

    input.ruleDate = convertStringDateFormat(input.ruleDate);
    input.ruleCode = removeQuotes(input.ruleCode);
    input.ruleDescription = removeQuotes(input.ruleDescription);
    input.ruleLink = removeQuotes(input.ruleLink);

    const data = {
        excelRowNumber: input.$rowNumber,
        ruleNumber: input.ruleNumber,
        ruleCode: input.ruleCode,
        ruleDescription: input.ruleDescription,
        ruleDate: input.ruleDate,
        ruleLink: input.ruleLink
    };

    return {
        data: data,
        $recordKey: newGuid(),
    };
};
