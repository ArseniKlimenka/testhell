const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showRiskPremium(input) {
    const productCode = input?.rootContext?.Body?.mainInsuranceConditions.insuranceProduct.productCode;
    const manualCorrection = input?.rootContext?.Body?.risksCorrection.manualCorrection;
    const needToShow = productGroupArray.SHOW_UW_BUTTON.includes(productCode) && manualCorrection;

    return !needToShow;
};
