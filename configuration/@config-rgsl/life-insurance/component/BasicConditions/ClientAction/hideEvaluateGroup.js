const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function hideEvaluateGroup(input) {

    const body = input.context.Body;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const productGroupForHide = [product.TERMVVTB, product.EBMMGREINVEST].includes(productCode);

    if (productGroupForHide) {
        return true;
    }

    const configurationCodeName = input.context.ConfigurationCodeName;
    const currentActor = input.context.WorkUnitActor.CurrentActor;
    const isEquity = [
        lifeInsuranceConstants.productCode.EquityLifeInsuranceQuote,
        lifeInsuranceConstants.productCode.EquityLifeInsurancePolicy
    ].includes(configurationCodeName);
    const isAgent = currentActor == 'Agent';

    if (isEquity && isAgent) {
        return true;
    }

    return false;

};
