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
} = require('@config-rgsl/life-insurance/lib/strategyConfHelper');

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
            currencyCode: resultData.currencyCode ?? emptyText,
            productDescription: resultData.productDescription ?? emptyText,
            strategyDescriptionFull: resultData.strategyDescriptionFull ?? emptyText,
            payOffDescription: resultData.payOffDescription ?? emptyText,
            baseActiveDescription: resultData.baseActiveDescription ?? emptyText,
            participationCoeff: resultData.participationCoeff ?? emptyText,
            participationCoeffByPeriods: resultData.participationCoeffByPeriods ?? emptyText,
            optionPrice: resultData.optionPrice ?? emptyText,
            barrier: resultData.barrier ?? emptyText,
            barrierAutoCall: resultData.barrierAutoCall ?? emptyText,
            emitent: resultData.emitent ?? emptyText,
            fixRate: resultData.fixRate ?? emptyText,
            intialShare: resultData.intialShare ?? emptyText,
            hedgeCost: resultData.hedgeCost ?? emptyText,
            spreadBA: resultData.spreadBA ?? emptyText,
            payOffShortDescription: resultData.payOffShortDescription ?? emptyText,
            toolType: resultData.toolType ?? emptyText,
            measureToolNominal: resultData.measureToolNominal ?? emptyText,
            calculatingAgent: resultData.calculatingAgent ?? emptyText,
            priceOfMeasureTool: resultData.priceOfMeasureTool ?? emptyText,
            partOfPremiumForTool: resultData.partOfPremiumForTool ?? emptyText,
            discount: resultData.discount ?? emptyText,
        };
    });

    return result;

};
