'use strict';

const {
    newGuid,
    replaceNullWithUndefined,
    readyForDatabaseIssueDate,
    readyForDatabaseString,
    readyForDatabaseFloat,
    readyForDatabaseIssueDateArray
} = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');
const {
    stringAttributesArr,
    floatAttributesArr
} = require('@config-rgsl/life-insurance/lib/rateOfReturnRulesHelper');

module.exports = function resultMapping(input) {

    input = replaceNullWithUndefined(input);

    readyForDatabaseIssueDate(input, this);
    readyForDatabaseString(input, stringAttributesArr, this);
    readyForDatabaseFloat(input, floatAttributesArr, this);
    readyForDatabaseIssueDateArray(input, this);
    const data = {
        excelRowNumber: input.$rowNumber,
        productCode: input.productCode,
        strategyCode: input.strategyCode,
        issueDateFrom: input.issueDateFrom,
        issueDateTo: input.issueDateTo,
        issueDateStr: input.issueDateStr,
        insuranceTerms: input.insuranceTerms,
        currencyCode: input.currencyCode,
        guaranteedIncome: input.guaranteedIncome,
        variant: input.variant,
        rateOfReturn: input.rateOfReturn,
        cashback: input.cashback,
        rko: input.rko,
        participationCoeff: input.participationCoeff,
        manualRate: input.manualRate
    };

    return {
        data: data,
        $recordKey: newGuid(),
    };
};
