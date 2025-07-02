const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function hideCurrencyExchangeGroup(input) {

    const body = input.context.Body;
    const configurationCodeName = input.context.ConfigurationCodeName;
    const currentActor = input.context.WorkUnitActor.CurrentActor;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const isEquity = [
        lifeInsuranceConstants.productCode.EquityLifeInsuranceQuote,
        lifeInsuranceConstants.productCode.EquityLifeInsurancePolicy
    ].includes(configurationCodeName);
    const isAgent = currentActor == 'Agent';

    if (productCode == product.TERMVVTB) {
        return true;
    }

    if (isEquity && isAgent) {
        return true;
    }

    return false;

};
