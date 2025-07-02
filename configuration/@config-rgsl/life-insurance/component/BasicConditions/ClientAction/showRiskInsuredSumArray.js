const constants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showRiskInsuredSumArray(input, ambientProperties) {

    const body = input.context.Body;
    const fixedInsuredSumsArray = input.componentContext.fixedInsuredSums;
    const calcFromInsuredSum = input.componentContext.calcFromInsuredSum ?? false;

    if (!calcFromInsuredSum) { return false; }

    const isCollectivePolicy = ambientProperties.configurationCodeName == constants.productCode.CollectiveLifeInsurancePolicy;
    if (isCollectivePolicy) {

        return false;
    }

    if (fixedInsuredSumsArray && fixedInsuredSumsArray.length > 0)
    { return true; }
    return false;

};
