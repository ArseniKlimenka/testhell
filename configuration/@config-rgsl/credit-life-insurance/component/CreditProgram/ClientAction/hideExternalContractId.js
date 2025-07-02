const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function hideExternalContractId(input) {

    const body = input.context.Body;
    const productCode = getValue(body, 'mainInsuranceConditions.insuranceProduct.productCode');
    if (!productCode || productCode == 'CACB') { return true; }

    return false;

};
