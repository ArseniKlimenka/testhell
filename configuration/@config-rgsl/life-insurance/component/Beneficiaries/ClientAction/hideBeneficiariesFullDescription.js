'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function hideBeneficiariesFullDescription(input) {

    const productCode = getValue(input, 'context.Body.mainInsuranceConditions.insuranceProduct.productCode');
    const isWCENOAS = [product.WCENOAS, product.WCEN3OAS].includes(productCode);

    return isWCENOAS;

};
