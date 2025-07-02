const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function appendixRule(input) {

    const appendix = [];
    const isBasisGarant2 = lifeInsuranceConstants.product.IBG5BFKO2;

    const additionalServices = getValue(input, 'body.additionalServices', []);
    const productCode = getValue(input, 'body.mainInsuranceConditions.insuranceProduct.productCode');

    // Tax1
    //  Печатка: Налоговый вычет
    if (additionalServices.some(item => item.serviceCode == "TAX1") && productCode != isBasisGarant2) {
        appendix.push({
            name: `CommonAppendixImageContainer/img/Tax1.pdf`,
            mode: 'Append'
        });
    }

    return appendix;

};
