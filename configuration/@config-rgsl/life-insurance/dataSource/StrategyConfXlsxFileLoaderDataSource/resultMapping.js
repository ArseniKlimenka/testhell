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
} = require('@config-rgsl/life-insurance/lib/strategyConfHelper');

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
        currencyCode: input.currencyCode,
        productDescription: input.productDescription,
        strategyDescriptionFull: input.strategyDescriptionFull,
        payOffDescription: input.payOffDescription,
        baseActiveDescription: input.baseActiveDescription,
        participationCoeff: input.participationCoeff,
        participationCoeffByPeriods: input.participationCoeffByPeriods,
        optionPrice: input.optionPrice,
        barrier: input.barrier,
        barrierAutoCall: input.barrierAutoCall,
        emitent: input.emitent,
        fixRate: input.fixRate,
        intialShare: input.intialShare,
        hedgeCost: input.hedgeCost,
        spreadBA: input.spreadBA,
        payOffShortDescription: input.payOffShortDescription,
        toolType: input.toolType,
        measureToolNominal: input.measureToolNominal,
        calculatingAgent: input.calculatingAgent,
        priceOfMeasureTool: input.priceOfMeasureTool,
        partOfPremiumForTool: input.partOfPremiumForTool,
        discount: input.discount,
    };

    return {
        data: data,
        $recordKey: newGuid(),
    };
};
