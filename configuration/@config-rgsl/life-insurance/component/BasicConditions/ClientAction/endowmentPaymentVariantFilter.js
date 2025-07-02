'use strict';

module.exports = function endowmentPaymentVariantFilter(input) {

    let result = input?.items;
    const body = input.context.Body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;

    if (!productCode) {
        return result;
    }

    const availablePaymentFrequency = body?.productConfiguration?.availablePaymentFrequency ?? [];
    result = result.filter(item => availablePaymentFrequency.includes(item.endowmentPaymentVariantCode));

    return result;

};
