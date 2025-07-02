'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const excelParser = require('@config-rgsl/infrastructure/lib/ImportLoaderExcelParser');
const { boxedProducts, maleGender, femaleGender } = require('@config-rgsl/collective-life-insurance/lib/CollectivePolicyConsts');

/**
 * @errorCode {errorCode} wrongBirthDayDateFormat
 * @errorCode {errorCode} wrongAmountFormat
 * @errorCode {errorCode} wrongPremiumFormat
 * @errorCode {errorCode} surNameIsEmpty
 * @errorCode {errorCode} firstNameIsEmpty
 * @errorCode {errorCode} birthDayIsEmpty
 * @errorCode {errorCode} genderIsEmpty
 * @errorCode {errorCode} mobileIsEmpty
 * @errorCode {errorCode} amountIsEmpty
 * @errorCode {errorCode} premiumIsEmpty
 * @errorCode {errorCode} amountIsNotEmpty
 * @errorCode {errorCode} premiumIsNotEmpty
 * @errorCode {errorCode} wrongGender
 * @errorCode {errorCode} wrongMobile
 */
module.exports = function CollectiveLifeInsurancePolicyImportResultMappingValidation(input) {

    this.applicationContext.locale = "ru-RU";

    const productCode = getValue(this, 'businessContext.data.productCode');

    const errors = [];

    validateDate(input, errors, 'birthDay', 'wrongBirthDayDateFormat');
    validateNumber(input, errors, 'amount', 'wrongAmountFormat');
    validateNumber(input, errors, 'premium', 'wrongPremiumFormat');

    checkIsEmpty(input, errors, "surName", "surNameIsEmpty");
    checkIsEmpty(input, errors, "firstName", "firstNameIsEmpty");
    checkIsEmpty(input, errors, "birthDay", "birthDayIsEmpty");
    checkIsEmpty(input, errors, "gender", "genderIsEmpty");
    checkIsEmpty(input, errors, "mobile", "mobileIsEmpty");
    if (boxedProducts.includes(productCode)) {
        checkIsNotEmpty(input, errors, "amount", "amountIsNotEmpty");
        checkIsNotEmpty(input, errors, "premium", "premiumIsNotEmpty");
    } else {
        checkIsEmpty(input, errors, "amount", "amountIsEmpty");
        checkIsEmpty(input, errors, "premium", "premiumIsEmpty");
    }

    checkGender(input, errors, "wrongGender");

    checkMobilePhoneNumber(input, errors, "wrongMobile");

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

function validateNumber(input, errors, propertyName, errorCode) {

    const propertyValue = getValue(input, 'data.' + propertyName);
    if (!propertyValue) { return; }

    const value = excelParser.parseNumber(excelParser.trim(propertyValue));
    if (isNaN(value)) {
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

function checkIsNotEmpty(input, errors, propertyName, errorCode) {

    const propertyValue = getValue(input, 'data.' + propertyName);

    if (propertyValue != undefined) {
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

function checkMobilePhoneNumber(input, errors, errorCode) {

    const fullNumber = getValue(input, 'data.mobile', '');
    const clearFullNumber = fullNumber.replace(/\D/g, '');

    // 9161234567
    if (clearFullNumber.length == 10 && fullNumber == clearFullNumber) {
        return;
    }

    // 89161234567
    if (fullNumber.length == 11 && fullNumber == clearFullNumber && fullNumber[0] == '8') {
        return;
    }

    // +79161234567
    if (fullNumber.length == 12 && fullNumber == `+${clearFullNumber}` && fullNumber[1] == '7') {
        return;
    }

    errors.push({
        errorCode: errorCode,
        errorDataPath: "/"
    });
}
