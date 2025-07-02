
const { canGenerateNotePolicyNumberUI } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function showGeneratePolicyNumberButton(input, ambientProperties) {

    return canGenerateNotePolicyNumberUI(input, this.view);
};
