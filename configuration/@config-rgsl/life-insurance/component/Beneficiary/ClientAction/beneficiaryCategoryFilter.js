const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function beneficiaryCategoryFilter(input, ambientProperties) {

    let result = input.items;

    const body = input.rootContext.Body;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;

    if (!lifeInsuranceConstants.productGroupArray.ECATF.includes(productCode)) {
        result = result.filter(item => item != 'NonAdult');
    }

    return result;

};
