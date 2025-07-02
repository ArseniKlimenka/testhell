'use strict';

function getBusinessRulesFunction(funcLink) {

    const functionType = 'function';

    if (typeof funcLink === functionType) {

        return funcLink;

    } else if (typeof funcLink?.productConfiguration === functionType) {

        return funcLink.productConfiguration;

    } else if (typeof funcLink?.ePolicytConfiguration === functionType) {

        return funcLink.ePolicytConfiguration;

    } else if (typeof funcLink?.additionalServicesConfiguration === functionType) {

        return funcLink.additionalServicesConfiguration;

    } else if (typeof funcLink?.additionalServicesRules === functionType) {

        return funcLink.additionalServicesRules;

    } else if (typeof funcLink?.creditRisks === functionType) {

        return funcLink.creditRisks;

    } else if (typeof funcLink?.infoViewConfiguration === functionType) {

        return funcLink.infoViewConfiguration;

    } else if (typeof funcLink?.insuranceRulesConfiguration === functionType) {

        return funcLink.insuranceRulesConfiguration;

    } else if (typeof funcLink?.memoryCommissionConfiguration === functionType) {

        return funcLink.memoryCommissionConfiguration;

    } else if (typeof funcLink?.policyChangeAmendmentRules === functionType) {

        return funcLink.policyChangeAmendmentRules;

    } else if (typeof funcLink?.rateOfReturnRules === functionType) {

        return funcLink.rateOfReturnRules;

    } else if (typeof funcLink?.riskPackagesConfiguration === functionType) {

        return funcLink.riskPackagesConfiguration;

    } else if (typeof funcLink?.strategyConfiguration === functionType) {

        return funcLink.strategyConfiguration;

    } else if (typeof funcLink?.strategyInstruments === functionType) {

        return funcLink.strategyInstruments;

    } else if (typeof funcLink?.tariffConstants === functionType) {

        return funcLink.tariffConstants;

    } else if (typeof funcLink?.underwriterCoeffConfiguration === functionType) {

        return funcLink.underwriterCoeffConfiguration;

    }
}

module.exports = {
    getBusinessRulesFunction
};
