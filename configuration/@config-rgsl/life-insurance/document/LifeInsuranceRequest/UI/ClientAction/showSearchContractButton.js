const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function showSearchContractButton(input, ambientProperties) {

    const configurationName = getValue(input, 'context.Body.contract.configurationName');

    if (configurationName)
    { return false; }
    return true;

};
