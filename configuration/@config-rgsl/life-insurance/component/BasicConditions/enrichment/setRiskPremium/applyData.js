const creditCalcHelper = require('@config-rgsl/life-insurance/lib/creditCalcHelper');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function applyData(input) {

    const body = this.businessContext.rootData;
    const productCode = getValue(body, 'mainInsuranceConditions.insuranceProduct.productCode');

    if (productCode == 'CACB')
    { body.basicConditions.riskPremium = creditCalcHelper.getRiskPremiumCACB(body); }

};
