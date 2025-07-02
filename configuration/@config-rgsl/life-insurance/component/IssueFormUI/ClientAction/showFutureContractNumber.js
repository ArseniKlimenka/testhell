const { isNoteProduct, isVtbProduct } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showFutureContractNumber(input) {

    const body = input.additionalContext.body;
    const contractType = input.context.Dimensions.contractType;
    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;

    return (isNoteProduct(productCode) || isVtbProduct(productCode)) && contractType == lifeInsuranceConstants.contractType.Quote;
};
