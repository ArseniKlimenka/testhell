const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { newRules } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
module.exports = function appendixRule(input) {

    const appendix = [];

    const productCode = getValue(input, 'body.mainInsuranceConditions.insuranceProduct.productCode');
    const issueDate = getValue(input, 'body.basicConditions.issueDate');

    return appendix;

};
