
const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function urlMapping(input) {

    const contract = input.data.Body.mainAttributes.contract;

    if (!contract || !contract.number || !contract.configurationName) {

        return;
    }

    return uriBuilder.getContractUri(contract.configurationName, '1', contract.number);
};
