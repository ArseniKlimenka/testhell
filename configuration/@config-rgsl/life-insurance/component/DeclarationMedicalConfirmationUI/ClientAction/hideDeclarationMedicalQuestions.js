'use strict';

const { product, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function hideDeclarationMedicalQuestions(input) {

    const productCode = getValue(input, 'context.Body.mainInsuranceConditions.insuranceProduct.productCode');
    const risks = getValue(input, 'context.Body.risks');
    const isWCENOAS = [product.WCENOAS, product.WCEN3OAS].includes(productCode);

    if (isWCENOAS) {
        if (risks.length > 3) {
            return false;
        }
        return true;

    }

    if (productGroupArray.MEDPRO.includes(productCode)) {
        return true;
    }

    if (productGroupArray.GENCHK.includes(productCode)) {
        return true;
    }

    return false;
};
