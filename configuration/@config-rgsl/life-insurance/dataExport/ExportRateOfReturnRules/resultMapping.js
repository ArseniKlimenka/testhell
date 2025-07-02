'use strict';

const {
    readyForExcelString,
    readyForExcelBoolean,
    convertArrayDate
} = require('@config-rgsl/life-insurance/lib/excelExportHelper');

const {
    stringAttributesArr,
    dateAttributesArr,
    booleanAttributesArr,
    issueDateStrConst
} = require('@config-rgsl/life-insurance/lib/rateOfReturnRulesHelper');

const emptyText = '';

module.exports = function resultMapping(input) {

    const stringAttributes = [...stringAttributesArr, ...dateAttributesArr];
    readyForExcelString(input, stringAttributes);
    readyForExcelBoolean(input, booleanAttributesArr);
    convertArrayDate(input, issueDateStrConst);

    const result = input.data.map((item, index) => {

        const resultData = item.resultData;

        return {
            ruleNumber: index + 1 ?? emptyText,
            productCode: resultData.productCode ?? emptyText,
            strategyCode: resultData.strategyCode ?? emptyText,
            issueDate: resultData.issueDateStr ?? emptyText,
            insuranceTerms: resultData.insuranceTerms ?? emptyText,
            currencyCode: resultData.currencyCode ?? emptyText,
            guaranteedIncome: resultData.guaranteedIncome ?? emptyText,
            variant: resultData.variant ?? emptyText,
            rateOfReturn: resultData.rateOfReturn ?? emptyText,
            cashback: resultData.cashback ?? emptyText,
            rko: resultData.rko ?? emptyText,
            participationCoeff: resultData.participationCoeff ?? emptyText,
            manualRate: resultData.manualRate ?? emptyText
        };
    });

    return result;

};
