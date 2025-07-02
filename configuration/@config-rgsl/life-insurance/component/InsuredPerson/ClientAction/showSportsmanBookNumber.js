const { sportProducts } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showSportsmanBookNumber(input) {

    const body = input.context.Body;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;

    if (sportProducts.includes(productCode)) {
        return true;
    }

    return false;
};
