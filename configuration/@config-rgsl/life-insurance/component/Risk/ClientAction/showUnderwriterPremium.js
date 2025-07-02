'use strict';

const { getBusinessRulesFunction } = require("@config-rgsl/life-insurance/lib/businessRulesHelper");
const underwriterCoeffConfigurationLink = require("@config-rgsl/life-insurance/lib/underwriterCoeffConfiguration");
const underwriterCoeffConfiguration = getBusinessRulesFunction(underwriterCoeffConfigurationLink);
const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showUnderwriterPremium(input) {

    const riskCode = input.data?.risk?.riskCode;
    const productCode = input.rootContext?.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const conf = underwriterCoeffConfiguration({productCode, riskCode});
    const isEcofRisks = [product.ECOFVVTB, product.ECOFPVTB, product.ECOF2ZENIT].includes(productCode) && ['E36404', 'CDVV36404'].includes(riskCode);
    if (!conf) { return false; }

    return conf.showUnderwriterPremium && !isEcofRisks;
};
