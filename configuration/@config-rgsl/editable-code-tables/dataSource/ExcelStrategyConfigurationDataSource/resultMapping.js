const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const ImportLoaderExcelParser = require('@config-rgsl/infrastructure/lib/ImportLoaderExcelParser');

module.exports = function resultMapping(input) {

    const mapped = {
        productCode: getValue(input, 'productCode'),
        strategyCode: getValue(input, 'strategyCode'),
        issueDateMin: ImportLoaderExcelParser.parseDate(getValue(input, 'issueDateMin')),
        issueDateMax: ImportLoaderExcelParser.parseDate(getValue(input, 'issueDateMax')),
        productDescription: getValue(input, 'productDescription'),
        strategyDescriptionFull: getValue(input, 'strategyDescriptionFull'),
        payOffDescription: getValue(input, 'payOffDescription'),
        baseActiveDescription: getValue(input, 'baseActiveDescription'),
        participationCoeff: ImportLoaderExcelParser.parseNumber(getValue(input, 'participationCoeff')),
        participationCoeffByPeriods: getValue(input, 'participationCoeffByPeriods'),
        optionPrice: ImportLoaderExcelParser.parseNumber(getValue(input, 'optionPrice')),
        barrier: getValue(input, 'barrier'),
        barrierAutoCall: getValue(input, 'barrierAutoCall'),
        emitent: getValue(input, 'emitent'),
        fixRate: ImportLoaderExcelParser.parseNumber(getValue(input, 'fixRate')),
        intialShare: ImportLoaderExcelParser.parseNumber(getValue(input, 'intialShare')),
        hedgeCost: ImportLoaderExcelParser.parseNumber(getValue(input, 'hedgeCost')),
        spreadBA: ImportLoaderExcelParser.parseNumber(getValue(input, 'spreadBA')),
        payOffShortDescription: getValue(input, 'payOffShortDescription'),
        toolType: getValue(input, 'toolType'),
        measureToolNominal: ImportLoaderExcelParser.parseNumber(getValue(input, 'measureToolNominal')),
        calculatingAgent: getValue(input, 'calculatingAgent'),
        priceOfMeasureTool: ImportLoaderExcelParser.parseNumber(getValue(input, 'priceOfMeasureTool')),
        partOfPremiumForTool: ImportLoaderExcelParser.parseNumber(getValue(input, 'partOfPremiumForTool'))
    };

    return {
        data: mapped,
        $recordKey: `${input.$rowNumber}`
    };
};
