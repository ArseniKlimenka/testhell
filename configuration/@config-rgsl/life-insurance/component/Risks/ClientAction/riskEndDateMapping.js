'use strict';
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function riskEndDateMapping(input, ambientProperties) {

    const body = input.context.Body;
    const productCode = getValue(body, 'mainInsuranceConditions.insuranceProduct.productCode');
    const riskCode = getValue(input, 'data.risk.riskCode');

    if ((productCode == 'WCENOAS' || productCode === 'WCEN3OAS') && (riskCode == 'DLP46204' || riskCode == 'DLP46204M')) {

        return 'Пожизненно';
    }

    return DateTimeUtils.formatDate(input.data.endDate, DateTimeUtils.DateFormats.CALENDAR);
};
