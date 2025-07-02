'use strict';

function generateOGRN() {

    const taxpayer = String(Math.floor((Math.random() * 9) + 1));
    const lastTwoRegistrationYearNumbers = addZerosToString(String(Math.floor((Math.random() * 16) + 1)), 2);
    const subjectCode = addZerosToString(String(Math.floor((Math.random() * 92) + 1)), 2);
    const districtTaxOfficeNumber = addZerosToString(String(Math.floor((Math.random() * 99) + 1)), 2);
    const companyRegisteredRecordNumber = addZerosToString(String(Math.floor((Math.random() * 99999) + 1)), 5);
    let OGRN = taxpayer + lastTwoRegistrationYearNumbers + subjectCode + districtTaxOfficeNumber + companyRegisteredRecordNumber;
    let checkNumber = String(((OGRN) % 11) % 10);
    checkNumber == 10 ? checkNumber = 0 : checkNumber;
    OGRN = OGRN + checkNumber;

    return OGRN;
}

function addZerosToString(stringToAdd, length) {
    const currentLength = stringToAdd.length;
    if (currentLength < length) {
        for (let i = 0; i < (length - currentLength); i++) {
            stringToAdd = stringToAdd + '0';
        }
    }
    return stringToAdd;
}

const generateData = {
    generateOGRN
};

module.exports = generateData;
