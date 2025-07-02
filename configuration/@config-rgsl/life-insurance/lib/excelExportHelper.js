'use strict';
const formatHelper = require('@config-rgsl/infrastructure/lib/FormatUtils');

function readyForExcelString(input, stringAttributes) {

    if (input.data?.length > 0 && stringAttributes?.length > 0) {

        input.data.forEach((item) => {

            const input = item.resultData;

            Object.keys(input).forEach(key => {

                if (stringAttributes.includes(key)) {

                    const productCode = input.productCode;
                    const productCodeMsg = productCode ? `Код продукта ${productCode}. ` : '';
                    const attributeName = key;
                    const attribute = input[key];
                    const errorMessage = `${productCodeMsg}Атрибут ${attributeName} ${attribute} должен иметь строковый формат.`;

                    if (typeof attribute != "string") {
                        throw new Error(errorMessage);
                    }

                    input[attributeName] = `"${attribute?.replaceAll('"', '\\"')}"`;
                }
            });
        });
    }

    return input;
}

function readyForExcelBoolean(input, booleanAttributes) {

    if (input.data?.length > 0 && booleanAttributes?.length > 0) {

        input.data.forEach((item) => {

            const input = item.resultData;

            Object.keys(input).forEach(key => {

                if (booleanAttributes.includes(key)) {

                    const productCode = input.productCode;
                    const productCodeMsg = productCode ? `Код продукта ${productCode}. ` : '';
                    const attributeName = key;
                    const attribute = input[key];
                    const errorMessage = `${productCodeMsg}Атрибут ${attributeName} ${attribute} должен иметь логический тип данных.`;

                    if (typeof attribute != "boolean") {
                        throw new Error(errorMessage);
                    }

                    if (attribute) {
                        input[attributeName] = "true";
                    } else {
                        input[attributeName] = "false";
                    }

                }
            });
        });
    }

    return input;
}

function readyForExcelSingleDate(input, dateAttributesArr) {
    if (input.data?.length > 0 && dateAttributesArr?.length > 0) {

        input.data.forEach((item) => {

            const input = item.resultData;

            Object.keys(input).forEach(key => {

                if (dateAttributesArr.includes(key)) {

                    input[key] = formatHelper.formatDateTimeToString(input[key]);

                }
            });
        });
    }

    return input;
}

function convertArrayDate(input, arrayDate) {
    if (input.data?.length > 0 && arrayDate?.length > 0) {

        input.data.forEach((item) => {

            const input = item.resultData;

            Object.keys(input).forEach(key => {

                if (arrayDate.includes(key)) {

                    const attribute = input[key];
                    const doubleDot = '..';
                    const issueDateArray = JSON.parse(attribute.split(doubleDot)) ?? [];
                    switch (key) {
                        case 'issueDateStr':
                            input[key] = `${formatHelper.formatDateTimeToString(issueDateArray[0])}-${formatHelper.formatDateTimeToString(issueDateArray[1])}`;
                            break;
                        case 'couponPeriods':
                            input[key] = JSON.parse(attribute).map(({beginDate, endDate}) => {
                                return `${formatHelper.formatDateTimeToString(beginDate)}-${formatHelper.formatDateTimeToString(endDate)}`; }).join(',\n');
                            break;
                    }

                }
            });
        });
    }

    return input;
}

module.exports = {
    readyForExcelString,
    readyForExcelBoolean,
    readyForExcelSingleDate,
    convertArrayDate
};
