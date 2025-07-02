'use strict';

const {
    readyForExcelString,
    readyForExcelBoolean,
    readyForExcelSingleDate,
    convertArrayDate
} = require('@config-rgsl/life-insurance/lib/excelExportHelper');

const {
    stringAttributesArr,
    dateAttributesArr,
    booleanAttributesArr,
    arrayDate
} = require('@config-rgsl/life-insurance/lib/strategyInstrHelper');

const emptyText = '';

module.exports = function resultMapping(input) {

    const stringAttributes = [...stringAttributesArr, ...dateAttributesArr];
    readyForExcelString(input, stringAttributes);
    readyForExcelBoolean(input, booleanAttributesArr);
    readyForExcelSingleDate(input, dateAttributesArr);
    convertArrayDate(input, arrayDate);

    const result = input.data.map((item, index) => {

        const resultData = item.resultData;

        return {
            ruleNumber: index + 1 ?? emptyText,
            productCode: resultData.productCode ?? emptyText,
            strategyCode: resultData.strategyCode ?? emptyText,
            issueDate: resultData.issueDateStr ?? emptyText,
            productDescription: resultData.productDescription ?? emptyText,
            strategyDescriptionFull: resultData.strategyDescriptionFull ?? emptyText,
            purchaseDate: resultData.purchaseDate ?? emptyText,
            dischargeDate: resultData.dischargeDate ?? emptyText,
            didBeginDate: resultData.didBeginDate ?? emptyText,
            didEndDate: resultData.didEndDate ?? emptyText,
            couponPeriods: resultData.couponPeriods ?? emptyText,
            windowStartDate: resultData.windowStartDate ?? emptyText,
            windowEndDate: resultData.windowEndDate ?? emptyText
        };
    });

    return result;

};
