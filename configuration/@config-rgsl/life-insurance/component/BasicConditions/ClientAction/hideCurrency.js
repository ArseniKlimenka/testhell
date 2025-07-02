const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function hideCurrency(input) {

    const body = input.context.Body;
    const configurationCodeName = input.context.ConfigurationCodeName;

    if ([lifeInsuranceConstants.productCode.CreditLifeInsuranceQuote, lifeInsuranceConstants.productCode.CreditLifeInsurancePolicy].includes(configurationCodeName)) {
        const productCode = getValue(body, 'mainInsuranceConditions.insuranceProduct.productCode');
        if (!productCode || productCode == 'CACB') { return true; }
    }

    return false;

};
