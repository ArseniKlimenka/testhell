'use strict';
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function resultMapping(input) {

    input = replaceNullWithUndefined(input);

    const ret = {
        startDate: convertExcelDateToStringDateFormat(input.startDate),
        endDate: convertExcelDateToStringDateFormat(input.endDate),
        insuranceProduct: input.insuranceProduct,
        insuranceProductInverted: input.insuranceProductInverted?.toLowerCase() === 'true',
        insuranceCurrency: input.insuranceCurrency,
        insuranceCurrencyInverted: input.insuranceCurrencyInverted?.toLowerCase() === 'true',
        insuranceYear: input.insuranceYear ? parseInt(input.insuranceYear) : undefined,
        insuranceTermFrom: input.insuranceTermFrom ? parseInt(input.insuranceTermFrom) : undefined,
        insuranceTermTo: input.insuranceTermTo ? parseInt(input.insuranceTermTo) : undefined,
        premiumPeriodFrom: input.premiumPeriodFrom ? parseInt(input.premiumPeriodFrom) : undefined,
        premiumPeriodTo: input.premiumPeriodTo ? parseInt(input.premiumPeriodTo) : undefined,
        premiumPeriodType: input.premiumPeriodType,
        rate: input.rate ? parseFloat(input.rate) : undefined,
        expensesRate: input.expensesRate ? parseFloat(input.expensesRate) : undefined,
        natuaralPersonRate: input.natuaralPersonRate ? parseFloat(input.natuaralPersonRate) : undefined,
        solePropriatorRate: input.solePropriatorRate ? parseFloat(input.solePropriatorRate) : undefined,
        amount: input.amount ? parseFloat(input.amount) : undefined,
        isManualCorrectionDisabled: input.isManualCorrectionDisabled?.toLowerCase() === 'true',
        alwaysUseMaxRate: input.alwaysUseMaxRate?.toLowerCase() === 'true',
        isDiscountDisabled: input.isDiscountDisabled?.toLowerCase() === 'true',
        creditProgram: input.creditProgram,
        creditProgramInverted: input.creditProgramInverted?.toLowerCase() === 'true',
        variant: input.variant,
        variantInverted: input.variantInverted?.toLowerCase() === 'true'
    };

    return ret;
};

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
