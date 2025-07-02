const { productCode } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function isInsuredPersonHide(input) {
    return input.context.Body.configurationCodeName == productCode.CollectiveLifeInsurancePolicy;
};
