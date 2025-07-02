'use strict';

const {
    newGuid,
    replaceNullWithUndefined,
    readyForDatabaseIssueDate,
    readyForDatabaseString,
    readyForDatabaseFloat,
    readyForDatabaseBoolean,
    readyForDatabaseObject,
    readyForDatabaseArray,
    readyForDatabaseDate
} = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');

const {
    stringAttributesArr,
    floatAttributesArr,
    arrayAttributesArr,
    booleanAttributesArr,
    dateAttributesArr,
    objectAttributesArr,
    objectWrongAttributesArr
} = require('@config-rgsl/life-insurance/lib/rateOfReturnRulesEquityActivesHelper');

module.exports = function resultMapping(input) {

    input = replaceNullWithUndefined(input);

    readyForDatabaseIssueDate(input, this);
    readyForDatabaseString(input, stringAttributesArr, this);
    readyForDatabaseFloat(input, floatAttributesArr, this);
    readyForDatabaseArray(input, arrayAttributesArr, this);
    readyForDatabaseBoolean(input, booleanAttributesArr, this);
    readyForDatabaseDate(input, dateAttributesArr, this);
    readyForDatabaseObject(input, objectAttributesArr, objectWrongAttributesArr, this);

    const data = {
        excelRowNumber: input.$rowNumber,
        productCode: input.productCode,
        insuranceTerms: input.insuranceTerms,
        issueDateFrom: input.issueDateFrom,
        issueDateTo: input.issueDateTo,
        issueDateStr: input.issueDateStr,
        manualRate: input.manualRate,
        investmentFrequency: input.investmentFrequency,
        mf: input.mf,
        costsOpenContracts: input.costsOpenContracts,
        commWithdrawalFunds: input.commWithdrawalFunds,
        rko: input.rko,
        isStandardContractConditions: input.isStandardContractConditions,
        isCoordinationUDRequired: input.isCoordinationUDRequired,
    };

    return {
        data: data,
        $recordKey: newGuid(),
    };
};
