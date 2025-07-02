'use strict';

const {
    newGuid,
    replaceNullWithUndefined,
    readyForDatabaseIssueDate,
    readyForDatabaseString,
    readyForDatabaseArray,
    readyForDatabaseIssueDateArray,
    readyForDatabaseDate,
    readyForDatabaseCouponPeriods
} = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');
const {
    stringAttributesArr,
    arrayAttributesArr,
    dateAttributesArr
} = require('@config-rgsl/life-insurance/lib/strategyInstrHelper');

module.exports = function resultMapping(input) {

    input = replaceNullWithUndefined(input);

    readyForDatabaseIssueDate(input, this);
    readyForDatabaseString(input, stringAttributesArr, this);
    readyForDatabaseArray(input, arrayAttributesArr, this);
    readyForDatabaseIssueDateArray(input, this);
    readyForDatabaseDate(input, dateAttributesArr, this);
    readyForDatabaseCouponPeriods(input);

    const data = {
        excelRowNumber: input.$rowNumber,
        productCode: input.productCode,
        strategyCode: input.strategyCode,
        issueDateFrom: input.issueDateFrom,
        issueDateTo: input.issueDateTo,
        issueDateStr: input.issueDateStr,
        productDescription: input.productDescription,
        strategyDescriptionFull: input.strategyDescriptionFull,
        purchaseDate: input.purchaseDate,
        dischargeDate: input.dischargeDate,
        didBeginDate: input.didBeginDate,
        didEndDate: input.didEndDate,
        couponPeriods: input.couponPeriods,
        windowStartDate: input.windowStartDate,
        windowEndDate: input.windowEndDate,
    };

    return {
        data: data,
        $recordKey: newGuid(),
    };
};
