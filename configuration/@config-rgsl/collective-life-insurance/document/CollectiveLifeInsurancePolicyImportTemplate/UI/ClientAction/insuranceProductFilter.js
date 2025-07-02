'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');

module.exports = function insuranceProductFilter(input, ambientProperties) {

    const partnerBusinessCode = getValue(input, 'context.Body.partner.partnerBusinessCode');
    if (!partnerBusinessCode) {

        return [];
    }

    const issueDate = DateTimeUtils.newDateAsString();

    const result = input.items.filter(item => confCorp({ productCode: item.productCode, issueDate })?.partnerBusinessCode == partnerBusinessCode);

    return result;
};
