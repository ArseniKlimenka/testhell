'use strict';

const {
    parseJSONconfigWrongObject,
} = require('@config-rgsl/life-insurance/lib/excelImportHelper');

const { translationUtils } = require('@adinsure/runtime');

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { LocalDateTime } = require('@js-joda/core');
// Common functions

function newGuid() {
    const requestId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return requestId;
}

function replaceNullWithUndefined(input) {
    if (input) {
        Object.keys(input).forEach(key => {
            if (input[key] == null) {
                input[key] = undefined;
            }
        });
    }
    return input;
}

function replaceNullWithUndefinedArray(inputArray) {
    const outputArray = [];
    if (inputArray) {
        inputArray.forEach(_ => {
            const item = replaceNullWithUndefined(_);
            outputArray.push(item);
        });
    }
    return outputArray;
}

function removeExtraSymbols(input) {
    return input?.replace((/ {2}|\r\n|\n|\r/gm), ' ').trim();
}

// Date convert functions

function convertStringDateFormat(stringDate) {
    if (!stringDate || stringDate == null) { return; }

    const masks = [
        /(?<!\d)(?<yyyy>\d{4})-(?<MM>\d{2})-(?<dd>\d{2})(?!\d)/,
        /(?<!\d)(?<dd>\d{2})\/(?<MM>\d{2})\/(?<yyyy>\d{4})(?!\d)/,
        /(?<!\d)(?<dd>\d{2})\.(?<MM>\d{2})\.(?<yyyy>\d{4})(?!\d)/,
        /(?<!\d)(?<dd>\d{2})-(?<MM>\d{2})-(?<yyyy>\d{4})(?!\d)/,
    ];

    let result;

    for (const mask of masks) {
        result = stringDate.match(mask);

        if (result) {
            break;
        }
    }

    if (result) {
        return result.groups.yyyy + '-' + result.groups.MM + '-' + result.groups.dd;
    }
    return stringDate;

}

function convertExcelDateToStringDateFormat(excelDate, dateFormat = dateTimeUtils.DateFormats.ECMASCRIPT) {

    if (!isFinite(excelDate)) {
        return excelDate;
    }

    const utc_days = Math.floor(excelDate - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);

    const fractional_day = excelDate - Math.floor(excelDate) + 0.0000001;
    let total_seconds = Math.floor(86400 * fractional_day);
    const sec = total_seconds % 60;
    total_seconds -= sec;
    const hrs = Math.floor(total_seconds / (60 * 60));
    const min = Math.floor(total_seconds / 60) % 60;

    const jsDate = new Date(Date.UTC(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hrs, min, sec));
    return dateTimeUtils.formatDate(jsDate, dateFormat);
}

// Data convert & check functions

function getContractDuration(stringDuration) {
    if (!stringDuration || stringDuration == null) { return; }

    const strArr = stringDuration.split(/([0-9]+)/);
    if (strArr.length < 2) { return; }

    return strArr[1];
}

function isValidString(input) {
    return input && /^[A-Za-z0-9\u00eb\u00cb\u0401\u0451\u0410-\u044f '-]+$/.test(input);
}

function exctactNameFromString(dataString) {
    const nameMatch = dataString.match(/([A-Za-z\u00eb\u00cb\u0401\u0451\u0410-\u044f'-.]+)( ([A-Za-z\u00eb\u00cb\u0401\u0451\u0410-\u044f'-.]+)){2}/gm);

    if (nameMatch && nameMatch.length > 0) {
        return nameMatch[0];
    }
    return exctactSingleWordFromString(dataString);

}

function exctactSingleWordFromString(dataString) {
    const nameMatch = dataString.match(/[A-Za-z\u00eb\u00cb\u0401\u0451\u0410-\u044f]+/gm);
    if (nameMatch && nameMatch.length > 0) {
        return nameMatch[0];
    }
    return '';

}

function readyForDatabaseIssueDate(input, that) {

    const productCode = input.productCode;
    const productCodeMsg = productCode ? `Код продукта ${productCode}. ` : '';
    const issueDateStr = input.issueDateStr;

    let issueDateArr = [];

    if (issueDateStr) {
        issueDateArr = issueDateStr.split('-');
    }

    if (issueDateArr.length == 2) {

        const issueDateFrom = dateTimeUtils.parseLocalDateToISO(issueDateArr[0]);
        const issueDateTo = dateTimeUtils.parseLocalDateToISO(issueDateArr[1]);

        if (dateTimeUtils.isDateValid(issueDateFrom)) {
            input.issueDateFrom = issueDateFrom;
        } else {
            throw new Error(`${productCodeMsg}Проверьте первый период даты заключения issueDate ${issueDateFrom}, дата должна иметь формат ["yyyy-mm-dd"] и существовать в календаре!`);
        }

        if (dateTimeUtils.isDateValid(issueDateTo)) {
            input.issueDateTo = issueDateTo;
        } else {
            throw new Error(`${productCodeMsg}Проверьте второй период даты заключения issueDate ${issueDateTo}, дата должна иметь формат ["yyyy-mm-dd"] и существовать в календаре!`);
        }

    } else {
        throw new Error(`${productCodeMsg}Дата заключения ${issueDateStr} должна иметь формат ["yyyy-mm-dd".."yyyy-mm-dd"].`);
    }
}

function readyForDatabaseActiveDate(input) {

    const productCode = input.productCode;
    const productCodeMsg = productCode ? `Код продукта ${productCode}. ` : '';

    if (input.activeFrom) {

        if (dateTimeUtils.isDateValid(input.activeFrom)) {
            input.activeFrom = JSON.parse(input.activeFrom);
        } else {
            throw new Error(`${productCodeMsg}Проверьте первый период даты действия activeFrom ${input.activeFrom}, дата должна иметь формат ["yyyy-mm-dd"] и существовать в календаре!`);
        }

    } else {
        throw new Error(`${productCodeMsg}Дата действия activeFrom ${input.activeFrom} должна быть заполнена и иметь формат "yyyy-mm-dd".`);
    }

    if (input.activeTo) {

        if (dateTimeUtils.isDateValid(input.activeTo)) {
            input.activeTo = JSON.parse(input.activeTo);
        } else {
            throw new Error(`${productCodeMsg}Проверьте второй период даты действия activeTo ${input.activeTo}, дата должна иметь формат ["yyyy-mm-dd"] и существовать в календаре!`);
        }

    } else {
        throw new Error(`${productCodeMsg}Дата действия activeTo ${input.activeTo} должна быть заполнена и иметь формат "yyyy-mm-dd".`);
    }
}

function readyForDatabaseString(input, stringAttributes, that, notJsonString) {

    if (input && stringAttributes?.length > 0) {

        Object.keys(input).forEach(key => {

            if (stringAttributes.includes(key)) {

                const productCode = input.productCode;
                const productCodeMsg = productCode ? `Код продукта ${productCode}. ` : '';
                const attributeName = key;
                const attribute = input[key];
                const attributeNameTranslationMsg = getTranslationFromImportedView(that, attributeName);
                const errorMessage = `${productCodeMsg}${attributeNameTranslationMsg} - значение "${attribute}" должно иметь строковый формат.`;
                const isStringArray = attribute?.replaceAll(' ', '')?.includes('","');

                if (isStringArray) {
                    throw new Error(errorMessage + ' Содержать одно значение.');
                }

                if (attribute) {

                    let parsedAttribute;

                    try {

                        if (notJsonString) {
                            parsedAttribute = attribute;
                        } else {
                            parsedAttribute = JSON.parse(attribute);
                        }

                        if (typeof parsedAttribute != "string") {
                            throw new Error(errorMessage);
                        }
                    }
                    catch (error) {
                        throw new Error(errorMessage);
                    }

                    input[attributeName] = parsedAttribute.trim();
                }
            }
        });
    }

    return input;
}

function readyForDatabaseInt(input, intAttributes, that) {

    if (input && intAttributes?.length > 0) {

        Object.keys(input).forEach(key => {

            if (intAttributes.includes(key)) {

                const productCode = input.productCode;
                const productCodeMsg = productCode ? `Код продукта ${productCode}. ` : '';
                const attributeName = key;
                const attribute = input[key];
                const attributeNameTranslationMsg = getTranslationFromImportedView(that, attributeName);
                const errorMessage = `${productCodeMsg}${attributeNameTranslationMsg} - значение "${attribute}" должно иметь числовой формат.`;

                if (attribute) {

                    let parsedAttribute;

                    try {
                        parsedAttribute = parseInt(attribute);
                        if (isNaN(parsedAttribute)) {
                            throw new Error(errorMessage);
                        }
                    }
                    catch (error) {
                        throw new Error(errorMessage);
                    }

                    input[attributeName] = parsedAttribute;
                }
            }
        });
    }

    return input;
}

function readyForDatabaseFloat(input, floatAttributes, that) {

    if (input && floatAttributes?.length > 0) {

        Object.keys(input).forEach(key => {

            if (floatAttributes.includes(key)) {

                const productCode = input.productCode;
                const productCodeMsg = productCode ? `Код продукта ${productCode}. ` : '';
                const attributeName = key;
                const attribute = input[key];
                const attributeNameTranslationMsg = getTranslationFromImportedView(that, attributeName);
                const errorMessage = `${productCodeMsg}${attributeNameTranslationMsg} - значение "${attribute}" должно иметь формат десятичного числа.`;

                if (attribute) {

                    let parsedAttribute;

                    try {
                        parsedAttribute = parseFloat(attribute);
                        if (isNaN(parsedAttribute)) {
                            throw new Error(errorMessage);
                        }
                    }
                    catch (error) {
                        throw new Error(errorMessage);
                    }

                    input[attributeName] = parsedAttribute;
                }
            }
        });
    }

    return input;
}

function readyForDatabaseBoolean(input, booleanAttributes, that) {

    if (input && booleanAttributes?.length > 0) {

        Object.keys(input).forEach(key => {

            if (booleanAttributes.includes(key)) {

                const productCode = input.productCode;
                const productCodeMsg = productCode ? `Код продукта ${productCode}. ` : '';
                const attributeName = key;
                const attribute = input[key];
                const attributeNameTranslationMsg = getTranslationFromImportedView(that, attributeName);
                const errorMessage = `${productCodeMsg}${attributeNameTranslationMsg} - значение "${attribute}" должно иметь логический тип данных, содержать текст 'false' или 'true'.`;

                if (attribute) {

                    if (!(attribute.toLowerCase() === "false" || attribute.toLowerCase() === "true")) {
                        throw new Error(errorMessage);
                    }

                    input[attributeName] = attribute.toLowerCase() === "true";
                }
            }
        });
    }

    return input;
}

function readyForDatabaseObject(input, objectAttributes, objectWrongAttributes, that) {

    if (input && objectAttributes?.length > 0) {

        Object.keys(input).forEach(key => {

            if (objectAttributes.includes(key)) {

                const productCode = input.productCode;
                const productCodeMsg = productCode ? `Код продукта ${productCode}. ` : '';
                const attributeName = key;
                const attribute = input[key];
                const attributeNameTranslationMsg = getTranslationFromImportedView(that, attributeName);
                const errorMessage = `${productCodeMsg}${attributeNameTranslationMsg} - значение "${attribute}" должно быть объектом`;

                if (attribute) {

                    let parsedAttribute;

                    try {
                        parsedAttribute = JSON.parse(attribute);
                        if (typeof parsedAttribute != 'object') {
                            throw new Error(errorMessage);
                        }
                    }
                    catch (error) {
                        throw new Error(errorMessage);
                    }

                    input[attributeName] = parsedAttribute;
                }
            }
        });
    }

    if (input && objectWrongAttributes?.length > 0) {

        Object.keys(input).forEach(key => {

            if (objectWrongAttributes.includes(key)) {

                const productCode = input.productCode;
                const productCodeMsg = productCode ? `Код продукта ${productCode}. ` : '';
                const attributeName = key;
                const attribute = input[key];
                const attributeNameTranslationMsg = getTranslationFromImportedView(that, attributeName);
                const errorMessage = `${productCodeMsg}${attributeNameTranslationMsg} - значение "${attribute}" должно быть объектом`;

                if (attribute) {

                    let parsedAttribute;

                    try {
                        parsedAttribute = parseJSONconfigWrongObject(attribute);
                        if (typeof parsedAttribute != 'object') {
                            throw new Error(errorMessage);
                        }
                    }
                    catch (error) {
                        throw new Error(errorMessage);
                    }

                    input[attributeName] = parsedAttribute;
                }
            }
        });
    }

    return input;
}

function readyForDatabaseArray(input, arrayAttributes, that) {

    if (input && arrayAttributes?.length > 0) {

        Object.keys(input).forEach(key => {

            if (arrayAttributes.includes(key)) {

                const productCode = input.productCode;
                const productCodeMsg = productCode ? `Код продукта ${productCode}. ` : '';
                const attributeName = key;
                const attribute = input[key];
                const attributeNameTranslationMsg = getTranslationFromImportedView(that, attributeName);
                const errorMessage = `${productCodeMsg}${attributeNameTranslationMsg} - значение "${attribute}" должно быть массивом.`;

                if (attribute) {

                    let parsedAttribute;

                    try {
                        parsedAttribute = JSON.parse(attribute);
                        if (!Array.isArray(parsedAttribute)) {
                            throw new Error(errorMessage);
                        }
                    }
                    catch (error) {
                        throw new Error(errorMessage);
                    }

                    input[attributeName] = parsedAttribute;
                }
            }
        });
    }

    return input;
}

function removeQuotes(input) {
    return input?.replaceAll('"', '');
}

function readyForDatabaseIssueDateArray(input, that) {

    const issueDateStr = input?.issueDateStr;

    let [startDate, endDate] = issueDateStr.split('-');

    startDate = dateTimeUtils.parseLocalDateToISO(startDate);
    endDate = dateTimeUtils.parseLocalDateToISO(endDate);

    input.issueDateStr = `["${startDate}".."${endDate}"]`;
}

function readyForDatabaseCouponPeriods(input) {

    const splitStringCoupon = input?.couponPeriods?.split(',') ?? [];

    input.couponPeriods = splitStringCoupon.map(r => {
        const [begin, end] = r.split('-');
        const beginDate = dateTimeUtils.parseLocalDateToISO(begin.replace(/\n/g, ''));
        const endDate = dateTimeUtils.parseLocalDateToISO(end.replace(/\n/g, ''));
        return {
            beginDate: beginDate,
            endDate: endDate
        };
    });
}

function readyForDatabaseDate(input, dateAttributesArr, that) {

    if (input && dateAttributesArr?.length > 0) {

        Object.keys(input).forEach(key => {

            if (dateAttributesArr.includes(key)) {
                const xlsxType = /^\d{2}\.\d{2}\.\d{4}$/;
                const systemType = /^\d{4}-\d{2}-\d{2}$/;

                if (xlsxType.test(input[key])) {
                    const [day, month, year] = input[key].split('.');
                    return input[key] = `${year}-${month}-${day}`;
                }

                if (systemType.test(input[key])) {
                    return input[key];
                }

                throw new Error('Формат даты должен быть DD.MM.YYYY');
            }
        });
    }

    return input;
}

function getTranslationFromImportedView(that, attributeName) {

    let successfullyImportedDefaultViewName;
    const ds = that.businessContext.configurationCodeName;
    const dsIndex = ds.indexOf("XlsxFileLoaderDataSource");

    if (dsIndex !== -1) {
        const partyOfDefaultViewName = ds.substring(0, dsIndex);
        successfullyImportedDefaultViewName = `SuccessfullyImported${partyOfDefaultViewName}`;
    }

    let attributeNameTranslation;

    if (successfullyImportedDefaultViewName) {
        attributeNameTranslation = translationUtils.getTranslation(`view/${successfullyImportedDefaultViewName}/1`, 'field-title', attributeName, attributeName, `${successfullyImportedDefaultViewName}UiSchema`);
    }

    const attributeNameTranslationMsg = attributeNameTranslation ? `Атрибут ${attributeNameTranslation} (${attributeName})` : `Атрибут ${attributeName}`;

    return attributeNameTranslationMsg;
}

function readyForDatabaseOriginalReceiptDate(input) {
    if (input.originalReceiptDate) {
        const stringDate = convertExcelDateToStringDateFormat(input.originalReceiptDate);

        if (dateTimeUtils.isDate(stringDate)) {
            return input.originalReceiptDate;
        }
    }

    throw new Error(`Номер договора ${input.contractNumber}: Необходимо корректно указать дату получения оригинала, дата должна иметь формат dd.mm.yyyy и существовать в календаре!`);
}

function readyForDatabaseHasAmendment(input) {
    const hasAmendment = input.hasAmendment;
    if (!hasAmendment) {

        throw new Error(`Номер договора ${input.contractNumber}: Необходимо корректно указать информацию о получении ДС в формате (Да/Нет)`);
    }

    if (['да', 'нет'].includes(hasAmendment.toLowerCase())) {

        return hasAmendment;
    }

    throw new Error(`Номер договора ${input.contractNumber}: Необходимо корректно указать информацию о получении ДС в формате (Да/Нет)`);
}

function readyForDatabaseHasPaymentIntermediateApplication(input) {
    const hasPaymentIntermediateApplication = input.hasPaymentIntermediateApplication;
    if (!hasPaymentIntermediateApplication) {

        throw new Error(`Номер договора ${input.contractNumber}: Необходимо корректно указать информацию о получении заявления на промежуточную выплату в формате (Да/Нет)`);
    }

    if (['да', 'нет'].includes(hasPaymentIntermediateApplication.toLowerCase())) {

        return hasPaymentIntermediateApplication;
    }

    throw new Error(`Номер договора ${input.contractNumber}: Необходимо корректно указать информацию о получении заявления на промежуточную выплату в формате (Да/Нет)`);
}

function readyForDatabasePaymentIntermediateApplicationDate(input) {
    if (input.paymentIntermediateApplicationDate) {
        const stringDate = convertExcelDateToStringDateFormat(input.paymentIntermediateApplicationDate);

        if (dateTimeUtils.isDate(stringDate)) {
            return input.paymentIntermediateApplicationDate;
        }
    }

    throw new Error(`Номер договора ${input.contractNumber}: Необходимо корректно указать дату получения заявления на промежуточную выплату, дата должна иметь формат dd.mm.yyyy и существовать в календаре!`);
}

module.exports = {
    newGuid,
    replaceNullWithUndefined,
    replaceNullWithUndefinedArray,
    removeExtraSymbols,
    convertStringDateFormat,
    convertExcelDateToStringDateFormat,
    getContractDuration,
    isValidString,
    exctactNameFromString,
    exctactSingleWordFromString,
    readyForDatabaseIssueDate,
    readyForDatabaseActiveDate,
    readyForDatabaseString,
    readyForDatabaseInt,
    readyForDatabaseFloat,
    readyForDatabaseBoolean,
    readyForDatabaseObject,
    readyForDatabaseArray,
    removeQuotes,
    readyForDatabaseIssueDateArray,
    readyForDatabaseDate,
    readyForDatabaseCouponPeriods,
    readyForDatabaseOriginalReceiptDate,
    readyForDatabaseHasAmendment,
    readyForDatabaseHasPaymentIntermediateApplication,
    readyForDatabasePaymentIntermediateApplicationDate
};
