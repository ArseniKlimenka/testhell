const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showInsuredSum(input) {
    const productCode = input?.rootContext?.Body?.mainInsuranceConditions.insuranceProduct.productCode;
    const manualCorrection = input?.rootContext?.Body?.risksCorrection.manualCorrection;
    const disableInsuredSumField = ['E36404'].includes(input?.context?.risk?.riskCode);
    const isECOF = [product.ECOFVVTB, product.ECOFPVTB, product.ECOF2ZENIT].includes(productCode) && manualCorrection && disableInsuredSumField;

    return !isECOF;
};
