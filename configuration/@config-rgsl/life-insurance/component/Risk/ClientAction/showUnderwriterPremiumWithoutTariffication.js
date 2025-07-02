'use strict';

const { getBusinessRulesFunction } = require("@config-rgsl/life-insurance/lib/businessRulesHelper");
const underwriterCoeffConfigurationLink = require("@config-rgsl/life-insurance/lib/underwriterCoeffConfiguration");
const underwriterCoeffConfiguration = getBusinessRulesFunction(underwriterCoeffConfigurationLink);

module.exports = function showUnderwriterPremiumWithoutTariffication(input) {

    const riskCode = input.data?.risk?.riskCode;
    const productCode = input.rootContext?.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const conf = underwriterCoeffConfiguration({ productCode, riskCode });
    if (!conf) { return false; }

    return conf.showUnderwriterPremiumWithoutTariffication;

};
