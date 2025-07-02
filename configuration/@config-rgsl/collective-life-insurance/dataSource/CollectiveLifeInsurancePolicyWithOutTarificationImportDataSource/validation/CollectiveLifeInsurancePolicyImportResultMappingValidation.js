'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const excelParser = require('@config-rgsl/infrastructure/lib/ImportLoaderExcelParser');
const { boxedProducts, maleGender, femaleGender } = require('@config-rgsl/collective-life-insurance/lib/CollectivePolicyConsts');

/**
 * @errorCode {errorCode} wrongBirthDayDateFormat
 * @errorCode {errorCode} surNameIsEmpty
 * @errorCode {errorCode} firstNameIsEmpty
 * @errorCode {errorCode} birthDayIsEmpty
 * @errorCode {errorCode} genderIsEmpty
 * @errorCode {errorCode} wrongGender
 */
module.exports = function CollectiveLifeInsurancePolicyImportResultMappingValidation(input) {

    this.applicationContext.locale = "ru-RU";

    const errors = [];

    validateDate(input, errors, 'birthDay', 'wrongBirthDayDateFormat');

    checkIsEmpty(input, errors, "surName", "surNameIsEmpty");
    checkIsEmpty(input, errors, "firstName", "firstNameIsEmpty");
    checkIsEmpty(input, errors, "birthDay", "birthDayIsEmpty");
    checkIsEmpty(input, errors, "gender", "genderIsEmpty");

    checkGender(input, errors, "wrongGender");

    return errors;
};

function validateDate(input, errors, propertyName, errorCode) {

    const propertyValue = getValue(input, 'data.' + propertyName);
    if (!propertyValue) {
        return;
    }

    try {
        if (propertyValue) { excelParser.parseDate(propertyValue); }
    }
    catch (ex) {
        errors.push({
            errorCode: errorCode,
            errorDataPath: "/"
        });

        return;
    }

    const dotDates = propertyValue.split(".");
    if (dotDates.length != 1) {
        if (dotDates.length != 3) {
            errors.push({
                errorCode: errorCode,
                errorDataPath: "/"
            });

            return;
        }

        if (dotDates[0].length != 2 || dotDates[1].length != 2 || dotDates[2].length != 4) {
            errors.push({
                errorCode: errorCode,
                errorDataPath: "/"
            });

            return;
        }
    }

    const dashDates = propertyValue.split("-");
    if (dashDates.length != 1) {
        if (dashDates.length != 3) {
            errors.push({
                errorCode: errorCode,
                errorDataPath: "/"
            });

            return;
        }

        if (dashDates[0].length != 4 || dashDates[1].length != 2 || dashDates[2].length != 2) {
            errors.push({
                errorCode: errorCode,
                errorDataPath: "/"
            });

            return;
        }
    }

    if (dotDates.length == 1 && dashDates.length == 1) {

        errors.push({
            errorCode: errorCode,
            errorDataPath: "/"
        });
    }
}

function checkIsEmpty(input, errors, propertyName, errorCode) {

    const propertyValue = getValue(input, 'data.' + propertyName);

    if (!propertyValue) {
        errors.push({
            errorCode: errorCode,
            errorDataPath: "/"
        });
    }
}

function checkGender(input, errors, errorCode) {

    let gender = getValue(input, 'data.gender');
    if (!gender) {
        return;
    }

    gender = gender.toLowerCase();
    if (!femaleGender.includes(gender) && !maleGender.includes(gender)) {
        errors.push({
            errorCode: errorCode,
            errorDataPath: "/"
        });
    }
}
