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
        purchaseDate: ImportLoaderExcelParser.parseDate(getValue(input, 'purchaseDate')),
        dischargeDate: ImportLoaderExcelParser.parseDate(getValue(input, 'dischargeDate')),
        didBeginDate: ImportLoaderExcelParser.parseDate(getValue(input, 'didBeginDate')),
        didEndDate: ImportLoaderExcelParser.parseDate(getValue(input, 'didEndDate')),
        couponPeriods: getValue(input, 'couponPeriods'),
        windowStartDate: ImportLoaderExcelParser.parseDate(getValue(input, 'windowStartDate')),
        windowEndDate: ImportLoaderExcelParser.parseDate(getValue(input, 'windowEndDate'))
    };

    return {
        data: mapped,
        $recordKey: `${input.$rowNumber}`
    };
};
