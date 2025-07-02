const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const emptyText = '';

module.exports = function resultMapping(input, additionalDataSources) {
    const creditPrograms = additionalDataSources.CreditProgramsDataSource.data;
    const lines = input.data[0].resultData.comissionRules.map((item) => {

        return {
            startDate: item.startDate ? DateTimeUtils.formatDate(item.startDate, DateTimeUtils.DateFormats.CALENDAR) : emptyText,
            endDate: item.endDate ? DateTimeUtils.formatDate(item.endDate, DateTimeUtils.DateFormats.CALENDAR) : emptyText,
            insuranceProductValues: item.insuranceProduct?.values ? item.insuranceProduct.values.map(product => `${product.description} (${product.code})`).join('; ') : emptyText,
            insuranceCurrencyValue: item.insuranceCurrency?.value.code ?? emptyText,
            insuranceCurrencyIsInverted: item.insuranceCurrency?.isInverted ?? emptyText,
            insuranceYearFrom: item.insuranceYearFrom ?? emptyText,
            insuranceYearTo: item.insuranceYearTo ?? emptyText,
            insuranceTermFrom: item.insuranceTermFrom ?? emptyText,
            insuranceTermTo: item.insuranceTermTo ?? emptyText,
            premiumPeriodFrom: item.premiumPeriodFrom ?? emptyText,
            premiumPeriodTo: item.premiumPeriodTo ?? emptyText,
            premiumPeriodType: item.premiumPeriodType?.values ? item.premiumPeriodType.values.map(x => x.description).join('; ') : emptyText,
            rate: item.rate ? round(item.rate * 100) : emptyText,
            expensesRate: item.expensesRate ? round(item.expensesRate * 100) : emptyText,
            natuaralPersonRate: item.natuaralPersonRate ? round(item.natuaralPersonRate * 100) : emptyText,
            solePropriatorRate: item.solePropriatorRate ? round(item.solePropriatorRate * 100) : emptyText,
            creditProgramValues: getCreditProgramValues(item.creditProgram?.values, creditPrograms) ?? emptyText,
            variantValues: item.variant?.values ? item.variant.values.map(x => x.code).join('; ') : emptyText,
            manualRule: item.manualRule ?? emptyText,
            manualRuleDescription: item.manualRuleDescription ?? emptyText
        };
    });

    const result = {

        lines: lines
    };


    return result;
};

function getCreditProgramValues(values, creditPrograms) {
    if (!values) {
        return;
    }

    const formatedPrograms = values.map(p => {
        const programInfo = creditPrograms.find(i => i.resultData.creditProgramCode === p.code);
        const version = programInfo?.resultData?.creditProgramVersion;
        const versionString = version ? `(${version})` : '';

        return `${p.description} ${versionString}`;
    });

    return formatedPrograms.join('; ');
}
