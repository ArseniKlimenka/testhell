"use strict";

const excelParser = require('@config-rgsl/infrastructure/lib/ImportLoaderExcelParser');

module.exports = function resultMapping(input) {

    const names = getNames(input);

    const data = {
        importRowNumber: input.$rowNumber.toString(),
        fullName: excelParser.trim(input.fullName),
        surName: names.surName,
        firstName: names.firstName,
        middleName: names.middleName,
        birthDay: excelParser.trim(input.birthDay),
        gender: excelParser.trim(input.gender),
        mobile: excelParser.trim(input.mobile),
        amount: excelParser.trim(input.amount),
        premium: excelParser.trim(input.premium)
    };

    const ret = {
        data: data,
        $recordKey: `${input.$rowNumber}`
    };

    return ret;
};

function getNames(input) {

    const fullName = excelParser.trim(input.fullName);
    if (fullName) {
        const names = fullName.split(" ");
        const surName = names[0];
        const firstName = names[1];
        const middleName = (names.length > 2) ? names.slice(- (names.length - 2)).join(" ") : " ";

        return {
            surName,
            firstName,
            middleName
        };
    }

    return {};
}
