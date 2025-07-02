const { getValue } = require("@config-rgsl/infrastructure/lib/ObjectUtils");
const { showForRisks, showForProducts } = require("@config-rgsl/life-insurance/lib/sumInsuredConstants");

module.exports = function showInsuranceAmountRestrictions(input, ambientProperties) {

    const riskCode = getValue(input, "data.risk.riskCode");
    const productCode = getValue(input, "rootContext.Body.mainInsuranceConditions.insuranceProduct.productCode");

    return showForRisks.includes(riskCode) && showForProducts.includes(productCode);
};
