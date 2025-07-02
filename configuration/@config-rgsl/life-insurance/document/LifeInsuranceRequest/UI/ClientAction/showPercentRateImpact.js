const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function showPercentRateImpact(input, ambientProperties) {

    const productCodeCPP = getValue(input, 'context.Body.contract.productGroup') == "credit";

    return productCodeCPP;

};
