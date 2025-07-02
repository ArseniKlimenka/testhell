const { product, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils.js');

module.exports = function hideIsSpecialOffer(input) {

    const body = input.context.Body;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body?.basicConditions?.issueDate;
    const isAfter01072025 = DateTimeUtils.isAfter(issueDate, '2025-06-30');

    const HIDE_FOR_PRODUCT = productGroupArray.HIDE_IS_SPECIAL_OFFER_BUTTON.includes(productCode);

    if (HIDE_FOR_PRODUCT && isAfter01072025) {
        return true;
    }

    return false;

};
