const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(input) {

    const productCode = getValue(this, 'businessContext.rootData.mainInsuranceConditions.insuranceProduct.productCode');
    const riskCode = getValue(input, 'risk.riskCode');

    const output = {
        data: {
            criteria: {
                productCode,
                riskCode
            }
        }
    };

    return output;

};
