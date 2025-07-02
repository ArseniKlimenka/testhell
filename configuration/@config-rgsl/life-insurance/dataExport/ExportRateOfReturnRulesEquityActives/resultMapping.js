'use strict';

const {
    readyForExcelString,
    readyForExcelBoolean
} = require('@config-rgsl/life-insurance/lib/excelExportHelper');

const {
    stringAttributesArr,
    dateAttributesArr,
    booleanAttributesArr
} = require('@config-rgsl/life-insurance/lib/rateOfReturnRulesEquityActivesHelper');

const emptyText = '';

module.exports = function resultMapping(input) {

    const stringAttributes = [...stringAttributesArr, ...dateAttributesArr];
    readyForExcelString(input, stringAttributes);
    readyForExcelBoolean(input, booleanAttributesArr);

    const result = input.data.map((item, index) => {

        const resultData = item.resultData;

        return {
            ruleNumber: index + 1 ?? emptyText,
            productCode: resultData.productCode ?? emptyText,
            insuranceTerms: resultData.insuranceTerms ?? emptyText,
            issueDate: resultData.issueDateStr ?? emptyText,
            manualRate: resultData.manualRate ?? emptyText,
            investmentFrequency: resultData.investmentFrequency ?? emptyText,
            mf: resultData.mf ?? emptyText,
            costsOpenContracts: resultData.costsOpenContracts ?? emptyText,
            commWithdrawalFunds: resultData.commWithdrawalFunds ?? emptyText,
            rko: resultData.rko ?? emptyText,
            isStandardContractConditions: resultData.isStandardContractConditions ?? emptyText,
            isCoordinationUDRequired: resultData.isCoordinationUDRequired ?? emptyText,
        };
    });

    return result;

};
