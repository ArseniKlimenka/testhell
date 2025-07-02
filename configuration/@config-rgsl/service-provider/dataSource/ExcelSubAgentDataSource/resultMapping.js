const ImportLoaderExcelParser = require('@config-rgsl/infrastructure/lib/ImportLoaderExcelParser');

module.exports = function resultMapping(input) {

    const mapped = {
        department: ImportLoaderExcelParser.emptyToString(input?.department),
        SKK: ImportLoaderExcelParser.parseNumber(input?.SKK),
        branch: ImportLoaderExcelParser.emptyToString(input?.branch),
        positionKFN: ImportLoaderExcelParser.emptyToString(input?.positionKFN),
        sadFinal: ImportLoaderExcelParser.emptyToString(input?.sadFinal),
        physicalPersonFullName: ImportLoaderExcelParser.emptyToString(input?.physicalPersonFullName),
        lnrNumberAgentAgreement: ImportLoaderExcelParser.parseNumber(input?.lnrNumberAgentAgreement),
        lnrNumberEmployeeAgreement: ImportLoaderExcelParser.parseNumber(input?.lnrNumberEmployeeAgreement),
        sadNumber: ImportLoaderExcelParser.parseNumber(input?.sadNumber),
        receiveType: ImportLoaderExcelParser.parseNumber(input?.receiveType),
        email: ImportLoaderExcelParser.emptyToString(input?.email),
        phoneNumber: ImportLoaderExcelParser.emptyToString(input?.phoneNumber),
        sadNumberMAG: ImportLoaderExcelParser.emptyToString(input?.sadNumberMAG),
        sadNumberNSO: ImportLoaderExcelParser.emptyToString(input?.sadNumberNSO),
        sadNumber1: ImportLoaderExcelParser.emptyToString(input?.sadNumber1),
        sadNumber2: ImportLoaderExcelParser.emptyToString(input?.sadNumber2),
        physicalPersonID: ImportLoaderExcelParser.emptyToString(input?.physicalPersonID),
        physicalPersonINN: ImportLoaderExcelParser.emptyToString(input?.physicalPersonINN),
        sadBeginDate: ImportLoaderExcelParser.parseDate(input?.sadBeginDate),
        sadEndDate: ImportLoaderExcelParser.parseDate(input?.sadEndDate),
        physicalPersonBirthDate: input?.physicalPersonBirthDate ? ImportLoaderExcelParser.parseDate(input?.physicalPersonBirthDate) : undefined,
        physicalPersonGender: ImportLoaderExcelParser.parseGender(input?.physicalPersonGender),
        isSASAgent: ImportLoaderExcelParser.parseRussianToBoolean(input?.isSASAgent),
        sapAD: ImportLoaderExcelParser.emptyToString(input?.sapAD)
    };

    return {
        data: mapped,
        $recordKey: `${input.$rowNumber}`
    };
};
