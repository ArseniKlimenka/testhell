'use strict';

const { product, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function hideDeclarationMedicalQuestions(input) {

    const productCode = getValue(input, 'context.Body.mainInsuranceConditions.insuranceProduct.productCode');
    const isWCENOAS = [product.WCENOAS, product.WCEN3OAS].includes(productCode);

    if (isWCENOAS) { return true; }

    return !productGroupArray.CAPCLCHILD.includes(productCode);
};
