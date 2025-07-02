const constants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showRiskInsuredSum(input, ambientProperties) {

    const fixedInsuredSumsArray = input.componentContext.fixedInsuredSums;
    const calcFromInsuredSum = input.componentContext.calcFromInsuredSum ?? false;

    if (!calcFromInsuredSum) { return false; }

    const isCollectivePolicy = ambientProperties.configurationCodeName == constants.productCode.CollectiveLifeInsurancePolicy;
    if (isCollectivePolicy) {

        return false;
    }

    if (fixedInsuredSumsArray && fixedInsuredSumsArray.length > 0)
    { return false; }
    return true;

};
