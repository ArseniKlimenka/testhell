"use strict";

const DateTimeUtils = require("@config-rgsl/infrastructure/lib/DateTimeUtils");

module.exports = function resultMapping(input) {

    const result = prepareRow(input);

    if (result.validationMessages.length > 0) {

        const errorMessage = result.validationMessages.join('; ');
        throw errorMessage;
    }

    return {
        data: result.parsedData,
        $recordKey: `${result.parsedData.importRowNumber}`
    };
};

function prepareRow(input) {

    const validationMessages = [];

    const rowNumber = input.$rowNumber.toString();
    const fullName = prepareStringValue(input.fullName, 'ФИО', validationMessages);
    const birthDate = prepareDateValue(input.birthDate, 'Застрахованный Дата рождения', validationMessages);
    const amount = prepareFloatValue(input.amount, 'Общая сумма', validationMessages);
    const franchise = prepareFloatValue(input.franchise, 'Франшиза', validationMessages);
    const totalAmount = prepareFloatValue(input.totalAmount, 'Итого к выплате', validationMessages);
    const registryEventDate = prepareDateValue(input.registryEventDate, 'Дата страхового события', validationMessages);
    const serviceDescription = prepareStringValue(input.serviceDescription, 'Наименование услуги', validationMessages);
    const serviceProviderName = prepareStringValue(input.serviceProviderName, 'Наименование ЛПУ', validationMessages);

    return {
        parsedData: {
            importRowNumber: rowNumber,
            fullName: fullName,
            birthDate: birthDate,
            amount: amount,
            franchise: franchise,
            totalAmount: totalAmount,
            registryEventDate: registryEventDate,
            serviceDescription: serviceDescription,
            serviceProviderName: serviceProviderName
        },
        validationMessages: validationMessages
    };
}

function prepareFloatValue(value, fieldName, validationMessages) {

    const trimmedValue = trimInputValue(value);

    if (!trimmedValue) {

        validationMessages.push(`Поле ${fieldName} должно быть заполнено`);
        return undefined;
    }

    const parsedValue = parseFloat(trimmedValue);

    if (!parsedValue) {

        validationMessages.push(`Поле ${fieldName} имеет не верный формат`);
        return undefined;
    }

    return parsedValue;
}

function prepareStringValue(value, fieldName, validationMessages) {

    const result = trimInputValue(value);

    if (!result) {

        validationMessages.push(`Поле ${fieldName} должно быть заполнено`);
        return undefined;
    }
    else if (typeof result !== 'string' && !(result instanceof String)) {

        validationMessages.push(`Поле ${fieldName} должно быть строкой`);
        return undefined;
    }
    else if (result.length === 0) {

        validationMessages.push(`Поле ${fieldName} должно иметь хотя бы один символ`);
        return undefined;
    }

    return result;
}

function prepareDateValue(value, fieldName, validationMessages) {

    let trimmedValue = trimInputValue(value);
    let objectValue;

    if (!trimmedValue) {

        validationMessages.push(`Поле ${fieldName} должно быть заполнено`);
        return undefined;
    }
    else if (typeof trimmedValue === "string" || trimmedValue instanceof String) {

        if (trimmedValue.length === 0) {

            validationMessages.push(`Поле ${fieldName} должно иметь хотя бы один символ`);
            return undefined;
        }

        let parts;

        if (/^(0?[1-9]|[12]\d{1}|3[01])\.(0?[1-9]|1[012])\.\d{2,4}$/.test(trimmedValue)) {

            parts = trimmedValue.split(".");
            objectValue = new Date(Date.UTC(parts[2], parts[1] - 1, parts[0]));
        }
        else if (/^\d{2,4}-(0?[1-9]|1[012])-([12]\d{1}|3[01]|0?[1-9])$/.test(trimmedValue)) {

            parts = trimmedValue.split("-");
            objectValue = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
        }
        else if (/^\d+$/.test(trimmedValue)) {

            objectValue = DateTimeUtils.addDays(new Date(Date.UTC(1900, 0, 1)), trimmedValue - 2);
        }
        else if (/^\d+[.,]\d+$/.test(trimmedValue)) {

            // Support for different decimal separators
            trimmedValue = trimmedValue.replace(",", ".");
            // Trunc is made to ignore the time part
            objectValue = DateTimeUtils.addDays(new Date(Date.UTC(1900, 0, 1)), Math.trunc(trimmedValue) - 2);
        }
        else {

            validationMessages.push(`Поле ${fieldName} имеет не верный формат`);
            return undefined;
        }

        return DateTimeUtils.formatDate(objectValue);
    }
    else if (typeof value === "number") {
        // Trunc is made to ignore the time part
        objectValue = DateTimeUtils.addDays(new Date(Date.UTC(1900, 0, 1)), Math.trunc(value) - 2);
        return DateTimeUtils.formatDate(objectValue);
    }

    validationMessages.push(`Поле ${fieldName} имеет не верный тип значения`);
    return undefined;
}

function trimInputValue(value) {

    if (typeof value === "string" || value instanceof String) {

        return value.trim();
    }

    return value;
}
